from __future__ import annotations

from collections import defaultdict
from datetime import datetime, timezone

from fastapi import APIRouter, Query

from db.mongo import get_database
from utils.mongo_serialization import serialize_mongo_document

router = APIRouter(prefix="/reports", tags=["reports"])


def _transactions_collection():
    return get_database()["transactions"]


def _budgets_collection():
    return get_database()["budgets"]


def _month_window(month: int | None = None, year: int | None = None) -> tuple[datetime, datetime, int, int]:
    now = datetime.now(timezone.utc)
    resolved_month = month or now.month
    resolved_year = year or now.year
    start = datetime(resolved_year, resolved_month, 1, tzinfo=timezone.utc)
    if resolved_month == 12:
        end = datetime(resolved_year + 1, 1, 1, tzinfo=timezone.utc)
    else:
        end = datetime(resolved_year, resolved_month + 1, 1, tzinfo=timezone.utc)
    return start, end, resolved_month, resolved_year


@router.get("/summary")
async def summary_report(
    user_id: str = Query(...),
    month: int | None = Query(default=None, ge=1, le=12),
    year: int | None = Query(default=None, ge=2000, le=2100),
) -> dict:
    start, end, resolved_month, resolved_year = _month_window(month, year)
    transactions = list(_transactions_collection().find({"user_id": user_id, "date": {"$gte": start, "$lt": end}}).sort("date", -1))

    income_total = 0.0
    expense_total = 0.0
    transfer_total = 0.0
    savings_total = 0.0
    category_totals: dict[str, float] = defaultdict(float)

    for transaction in transactions:
        amount = float(transaction.get("amount", 0) or 0)
        txn_type = str(transaction.get("type", "")).lower()
        if txn_type == "income":
            income_total += amount
        elif txn_type == "expense":
            expense_total += amount
            category = str(transaction.get("category") or "other")
            category_totals[category] += amount
        elif txn_type == "transfer":
            transfer_total += amount
        elif txn_type == "borrow" or txn_type == "lend":
            transfer_total += amount
        elif txn_type == "savings":
            savings_action = str(transaction.get("savings_action") or "").lower()
            if savings_action == "savings_withdrawal":
                savings_total -= amount
            else:
                savings_total += amount

    budgets = list(_budgets_collection().find({"user_id": user_id, "month": resolved_month, "year": resolved_year}).sort("updated_at", -1))
    current_budget = serialize_mongo_document({k: v for k, v in budgets[0].items() if k != "_id"}) if budgets else {}

    breakdown = [
        {"category": category, "amount": round(amount, 2)}
        for category, amount in sorted(category_totals.items(), key=lambda item: item[1], reverse=True)
    ]

    return {
        "period": {"month": resolved_month, "year": resolved_year},
        "totals": {
            "income": round(income_total, 2),
            "expense": round(expense_total, 2),
            "transfer": round(transfer_total, 2),
            "savings": round(savings_total, 2),
            "net": round(income_total - expense_total, 2),
        },
        "transaction_count": len(transactions),
        "category_breakdown": breakdown,
        "recent_transactions": [
            {"id": str(txn["_id"]), **serialize_mongo_document({k: v for k, v in txn.items() if k != "_id"})}
            for txn in transactions[:5]
        ],
        "budget": current_budget,
    }

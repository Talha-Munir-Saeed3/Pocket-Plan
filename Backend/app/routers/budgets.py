from __future__ import annotations

from fastapi import APIRouter, Query

from db.mongo import get_database
from models.pocket_plan_schema import Budget
from utils.mongo_serialization import serialize_mongo_document

router = APIRouter(prefix="/budgets", tags=["budgets"])


def _collection():
    return get_database()["budgets"]


def _with_id(document: dict) -> dict:
    return {"id": str(document["_id"]), **serialize_mongo_document({k: v for k, v in document.items() if k != "_id"})}


@router.post("")
async def save_budget(payload: Budget) -> dict:
    document = payload.model_dump()
    query = {
        "user_id": document["user_id"],
        "account_id": document["account_id"],
        "month": document["month"],
        "year": document["year"],
    }
    _collection().replace_one(query, document, upsert=True)
    stored = _collection().find_one(query)
    return _with_id(stored) if stored else {"message": "saved"}


@router.get("")
async def list_budgets(user_id: str = Query(...)) -> list[dict]:
    cursor = _collection().find({"user_id": user_id}).sort([("year", -1), ("month", -1)])
    return [_with_id(document) for document in cursor]


@router.get("/current")
async def current_budget(
    user_id: str = Query(...),
    account_id: str | None = Query(default=None),
    month: int | None = Query(default=None, ge=1, le=12),
    year: int | None = Query(default=None, ge=2000, le=2100),
) -> dict:
    query: dict[str, object] = {"user_id": user_id}
    if account_id:
        query["account_id"] = account_id
    if month is not None:
        query["month"] = month
    if year is not None:
        query["year"] = year

    document = _collection().find_one(query)
    return _with_id(document) if document else {}

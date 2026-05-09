from __future__ import annotations

from datetime import datetime, timezone

from fastapi import APIRouter, HTTPException, Query

from db.mongo import get_database
from models.pocket_plan_schema import Transaction
from utils.mongo_serialization import serialize_mongo_document

router = APIRouter(prefix="/transactions", tags=["transactions"])


def _collection():
    return get_database()["transactions"]


def _with_id(document: dict) -> dict:
    return {"id": str(document["_id"]), **serialize_mongo_document({k: v for k, v in document.items() if k != "_id"})}


@router.post("")
async def create_transaction(payload: Transaction) -> dict:
    document = payload.model_dump()
    result = _collection().insert_one(document)
    stored = {**document, "_id": result.inserted_id}
    return _with_id(stored)


@router.get("")
async def list_transactions(
    user_id: str = Query(...),
    limit: int = Query(50, ge=1, le=200),
    skip: int = Query(0, ge=0),
) -> list[dict]:
    cursor = (
        _collection()
        .find({"user_id": user_id})
        .sort([("date", -1), ("_id", -1)])
        .skip(skip)
        .limit(limit)
    )
    return [_with_id(document) for document in cursor]


@router.get("/recent")
async def recent_transactions(
    user_id: str = Query(...),
    limit: int = Query(5, ge=1, le=20),
) -> list[dict]:
    cursor = (
        _collection()
        .find({"user_id": user_id})
        .sort([("date", -1), ("_id", -1)])
        .limit(limit)
    )
    return [_with_id(document) for document in cursor]


@router.get("/history")
async def transaction_history(
    user_id: str = Query(...),
    months: int = Query(3, ge=1, le=24),
) -> list[dict]:
    now = datetime.now(timezone.utc)
    start_year = now.year
    start_month = now.month - (months - 1)
    while start_month <= 0:
        start_month += 12
        start_year -= 1
    start = datetime(start_year, start_month, 1, tzinfo=timezone.utc)

    cursor = (
        _collection()
        .find({"user_id": user_id, "date": {"$gte": start}})
        .sort([("date", -1), ("_id", -1)])
    )
    return [_with_id(document) for document in cursor]

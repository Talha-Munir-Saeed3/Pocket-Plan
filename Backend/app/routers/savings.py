from __future__ import annotations

from fastapi import APIRouter, HTTPException, Query
from bson import ObjectId

from db.mongo import get_database
from models.pocket_plan_schema import SavingsGoal, SavingsGoalUpdate
from utils.mongo_serialization import serialize_mongo_document

router = APIRouter(prefix="/savings-goals", tags=["savings-goals"])


def _collection():
    return get_database()["savings_goals"]


def _with_id(document: dict) -> dict:
    return {"id": str(document["_id"]), **serialize_mongo_document({k: v for k, v in document.items() if k != "_id"})}


@router.post("")
async def create_savings_goal(payload: SavingsGoal) -> dict:
    document = payload.model_dump()
    result = _collection().insert_one(document)
    stored = {**document, "_id": result.inserted_id}
    return _with_id(stored)


@router.get("")
async def list_savings_goals(user_id: str = Query(...)) -> list[dict]:
    cursor = _collection().find({"user_id": user_id}).sort([("is_primary", -1), ("created_at", -1)])
    return [_with_id(document) for document in cursor]


@router.patch("/{goal_id}")
async def update_savings_goal(goal_id: str, payload: SavingsGoalUpdate) -> dict:
    try:
        object_id = ObjectId(goal_id)
    except Exception as exc:
        raise HTTPException(status_code=400, detail="Invalid savings goal id") from exc

    update_data = {key: value for key, value in payload.model_dump(exclude_unset=True).items() if value is not None}
    if not update_data:
        document = _collection().find_one({"_id": object_id})
        return _with_id(document) if document else {}

    _collection().update_one({"_id": object_id}, {"$set": update_data})
    document = _collection().find_one({"_id": object_id})
    return _with_id(document) if document else {}

from __future__ import annotations

from datetime import datetime
from enum import Enum
from typing import Any

try:
    from bson import ObjectId
except Exception:  # pragma: no cover - bson is available with pymongo, this is defensive
    ObjectId = None  # type: ignore[assignment]


def serialize_mongo_value(value: Any) -> Any:
    if ObjectId is not None and isinstance(value, ObjectId):
        return str(value)
    if isinstance(value, datetime):
        return value.isoformat()
    if isinstance(value, Enum):
        return value.value
    if isinstance(value, list):
        return [serialize_mongo_value(item) for item in value]
    if isinstance(value, tuple):
        return [serialize_mongo_value(item) for item in value]
    if isinstance(value, dict):
        return {key: serialize_mongo_value(item) for key, item in value.items()}
    return value


def serialize_mongo_document(document: dict[str, Any]) -> dict[str, Any]:
    return serialize_mongo_value(document)

from pymongo import MongoClient
from pymongo.database import Database
from datetime import datetime, timezone

from config import settings

mongo_client: MongoClient | None = None


async def connect_to_mongo() -> None:
    global mongo_client
    if not settings.MONGODB_URI:
        return

    mongo_client = MongoClient(settings.MONGODB_URI)


async def close_mongo_connection() -> None:
    global mongo_client
    if mongo_client is None:
        return

    mongo_client.close()
    mongo_client = None


def get_database() -> Database:
    if mongo_client is None:
        raise RuntimeError("MongoDB client is not initialized")
    return mongo_client[settings.MONGODB_DB_NAME]


def ensure_admin_schema_collections() -> None:
    """Create admin collections with template documents for ERD/schema visibility in Atlas."""
    database = get_database()
    template_docs = {
        "admin_users": {
            "_schema_template": True,
            "id": "u_template",
            "name": "Template User",
            "email": "template@example.com",
            "phone": "+92 300 0000000",
            "status": "active",
            "subscriptionPlan": "free",
            "joinedAt": datetime.now(timezone.utc).date().isoformat(),
            "created_at": datetime.now(timezone.utc),
            "updated_at": datetime.now(timezone.utc),
        },
        "payments": {
            "_schema_template": True,
            "id": "p_template",
            "userId": "u_template",
            "userName": "Template User",
            "amount": 0.0,
            "status": "pending",
            "date": datetime.now(timezone.utc).date().isoformat(),
            "method": "Card",
            "description": "Template payment",
            "created_at": datetime.now(timezone.utc),
            "updated_at": datetime.now(timezone.utc),
        },
        "support_tickets": {
            "_schema_template": True,
            "id": "t_template",
            "userId": "u_template",
            "userName": "Template User",
            "subject": "Template ticket",
            "status": "open",
            "priority": "low",
            "createdAt": datetime.now(timezone.utc).date().isoformat(),
            "updatedAt": datetime.now(timezone.utc).date().isoformat(),
            "messages": 0,
            "created_at": datetime.now(timezone.utc),
            "updated_at": datetime.now(timezone.utc),
        },
    }

    existing_collections = set(database.list_collection_names())
    for collection_name, template in template_docs.items():
        collection = database[collection_name]
        if collection_name not in existing_collections:
            database.create_collection(collection_name)
        existing_template = collection.find_one({"_schema_template": True})
        if not existing_template:
            collection.insert_one(template)

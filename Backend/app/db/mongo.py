from pymongo import MongoClient
from pymongo.database import Database

from app.config import settings

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

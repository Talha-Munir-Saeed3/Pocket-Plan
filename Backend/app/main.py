from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from db.mongo import close_mongo_connection, connect_to_mongo, ensure_admin_schema_collections
from routers import budgets, health, reports, savings, transactions


@asynccontextmanager
async def lifespan(_: FastAPI):
    await connect_to_mongo()
    ensure_admin_schema_collections()
    yield
    await close_mongo_connection()


app = FastAPI(title="Pocket Plan Backend", version="0.1.0", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health.router)
app.include_router(transactions.router)
app.include_router(budgets.router)
app.include_router(savings.router)
app.include_router(reports.router)

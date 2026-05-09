from fastapi import APIRouter
from fastapi.responses import JSONResponse

from db.mongo import get_database

router = APIRouter(prefix="/health", tags=["health"])


@router.get("")
async def health_check() -> dict[str, str]:
    # TODO: Expand health check when external services are wired.
    return {"status": "ok"}


@router.get("/db")
async def db_health_check() -> JSONResponse:
    try:
        database = get_database()
        database.command("ping")
    except Exception as exc:
        return JSONResponse(
            status_code=503,
            content={
                "status": "error",
                "database": "disconnected",
                "detail": str(exc),
            },
        )

    return JSONResponse(
        status_code=200,
        content={
            "status": "ok",
            "database": "connected",
        },
    )

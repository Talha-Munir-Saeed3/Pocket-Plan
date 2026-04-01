from fastapi import APIRouter

router = APIRouter(prefix="/health", tags=["health"])


@router.get("")
async def health_check() -> dict[str, str]:
    # TODO: Expand health check when external services are wired.
    return {"status": "ok"}

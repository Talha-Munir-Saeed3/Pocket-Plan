from pydantic import BaseModel


class APIResponse(BaseModel):
    # TODO: Expand shared API response model.
    message: str = "ok"

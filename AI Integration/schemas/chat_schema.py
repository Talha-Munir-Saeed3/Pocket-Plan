from pydantic import BaseModel


class ChatRequest(BaseModel):
    # TODO: Expand request schema for chat completion.
    message: str

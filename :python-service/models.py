from pydantic import BaseModel, Field


class ChatRequest(BaseModel):
    message: str = Field(min_length=1, description="User question")


class ChatResponse(BaseModel):
    answer: str
    sources: list[str]

from pydantic import BaseModel


class GeminiRequest(BaseModel):
    model: str
    query: str

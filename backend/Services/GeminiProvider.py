# app/services/gemini_provider.py
from functools import lru_cache

from Services.GeminiService import GeminiService


@lru_cache(maxsize=1)
def get_gemini_service() -> GeminiService:
    return GeminiService()

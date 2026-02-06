from fastapi import Depends
from fastapi.routing import APIRouter
from Models.GeminiRequest import GeminiRequest
from Models.GeminiResponse import GeminiResponse
from Services.GeminiProvider import get_gemini_service
from Services.GeminiService import GeminiService

router = APIRouter(prefix="/api", tags=["gemini"])


@router.post("/ai", response_model=GeminiResponse)
def gemini_request(
    payload: GeminiRequest, gemini: GeminiService = Depends(get_gemini_service)
):
    query = payload.query
    response = gemini.invoke(query)
    return {
        "final_answer": response.final_answer,
        "reasoning_graph": response.reasoning_graph,
        "assumptions": response.assumptions,
        "confidence_notes": response.confidence_notes,
    }

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from Routers import ai
from Services.GeminiService import GeminiService

gemini_client = GeminiService()

# print(answer.final_answer)
app = FastAPI(title="Explainable AI", version="1.0.0")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_headers=["*"],
    allow_methods=["*"],
)
app.include_router(ai.router)

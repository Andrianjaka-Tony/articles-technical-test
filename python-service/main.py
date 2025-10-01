import logging
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from models import ChatRequest, ChatResponse
from search import KBSearch

from file_logger import log_chat_interaction

app = FastAPI(title="Finance Chatbot (Local KB)")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s | %(levelname)s | %(message)s",
)
logger = logging.getLogger("finance-chatbot")

kb = KBSearch(faq_path="faq.json")


@app.post("/chat", response_model=ChatResponse)
def chat(req: ChatRequest):
    if not req.message.strip():
        raise HTTPException(status_code=400, detail="Message vide")
    entry, score = kb.query(req.message)
    answer = entry.get("answer", "Je n’ai pas cette information.")
    source = entry.get("id", "faq#unknown")

    logger.info(
        f'Q="{req.message}" | A="{answer}" | source={source} | score={score:.3f}'
    )

    log_chat_interaction(
        question=req.message,
        answer=answer,
        extra={"sources": [source], "score": round(float(score), 3)},
    )

    return ChatResponse(answer=answer, sources=[source])

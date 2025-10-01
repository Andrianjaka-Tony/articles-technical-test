from __future__ import annotations
import json
import os
from datetime import datetime
from threading import Lock
from typing import Any, Dict

LOG_DIR = "logs"
LOG_FILE = os.path.join(LOG_DIR, "chat_logs.jsonl")

_lock = Lock()


def _ensure_log_dir() -> None:
    if not os.path.exists(LOG_DIR):
        os.makedirs(LOG_DIR, exist_ok=True)


def _utc_now_iso() -> str:
    return datetime.utcnow().replace(microsecond=0).isoformat() + "Z"


def log_chat_interaction(
    question: str, answer: str, extra: Dict[str, Any] | None = None
) -> None:
    """
    Écrit une ligne JSON:
    {"timestamp":"...","question":"...","answer":"..."} (+ champs extra si fournis)
    """
    _ensure_log_dir()
    payload: Dict[str, Any] = {
        "timestamp": _utc_now_iso(),
        "question": question,
        "answer": answer,
    }
    if extra:
        payload.update(extra)

    line = json.dumps(payload, ensure_ascii=False)
    with _lock:
        with open(LOG_FILE, "a", encoding="utf-8") as f:
            f.write(line + "\n")

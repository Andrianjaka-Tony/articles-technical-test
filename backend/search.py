import json
from typing import Any, Dict, List, Tuple

from utils import build_tfidf, vectorize_query, cosine


class KBSearch:
    def __init__(self, faq_path: str):
        with open(faq_path, "r", encoding="utf-8") as f:
            self.entries: List[Dict[str, Any]] = json.load(f)

        self._corpus: List[str] = [
            f"{e['question']} {e['answer']}" for e in self.entries
        ]
        self._vectors, self._idf = build_tfidf(self._corpus)

    def query(self, text: str) -> Tuple[Dict[str, Any], float]:
        qv = vectorize_query(text, self._idf)
        best_i, best_s = -1, -1.0
        for i, dv in enumerate(self._vectors):
            s = cosine(qv, dv)
            if s > best_s:
                best_s, best_i = s, i

        if best_i == -1:
            return {
                "id": "faq#unknown",
                "answer": "Je n’ai pas cette information dans ma FAQ locale.",
            }, 0.0
        return self.entries[best_i], best_s

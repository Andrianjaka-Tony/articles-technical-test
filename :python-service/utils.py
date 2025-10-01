import math
import re
import unicodedata
from collections import Counter
from typing import List, Dict, Tuple

TOKEN_RE = re.compile(r"\w+", re.UNICODE)


def normalize(text: str) -> str:
    text = text.lower().strip()
    text = unicodedata.normalize("NFKD", text)
    text = "".join(ch for ch in text if not unicodedata.combining(ch))
    return text


def tokenize(text: str) -> List[str]:
    return TOKEN_RE.findall(normalize(text))


def build_tfidf(corpus: List[str]) -> Tuple[List[Dict[str, float]], Dict[str, float]]:
    docs_tokens = [set(tokenize(doc)) for doc in corpus]
    df: Dict[str, int] = {}
    for toks in docs_tokens:
        for t in toks:
            df[t] = df.get(t, 0) + 1

    N = len(corpus)
    idf: Dict[str, float] = {
        t: math.log((N + 1) / (df_t + 1)) + 1 for t, df_t in df.items()
    }

    vectors: List[Dict[str, float]] = []
    for doc in corpus:
        counts = Counter(tokenize(doc))
        max_tf = max(counts.values()) if counts else 1
        vec: Dict[str, float] = {}
        for t, tf in counts.items():
            vec[t] = (tf / max_tf) * idf.get(t, 0.0)
        vectors.append(vec)
    return vectors, idf


def vectorize_query(query: str, idf: Dict[str, float]) -> Dict[str, float]:
    counts = Counter(tokenize(query))
    max_tf = max(counts.values()) if counts else 1
    return {t: (tf / max_tf) * idf.get(t, 0.0) for t, tf in counts.items()}


def cosine(a: Dict[str, float], b: Dict[str, float]) -> float:
    dot = sum(a.get(t, 0.0) * w for t, w in b.items())
    na = math.sqrt(sum(w * w for w in a.values()))
    nb = math.sqrt(sum(w * w for w in b.values()))
    if na == 0 or nb == 0:
        return 0.0
    return dot / (na * nb)

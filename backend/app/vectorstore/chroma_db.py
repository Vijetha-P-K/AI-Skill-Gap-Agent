import chromadb

from app.config.settings import settings
from app.utils.logger import logger

_client = None
_collection = None


def get_collection():
    global _client, _collection
    if _collection is None:
        _client = chromadb.PersistentClient(path=settings.CHROMA_PERSIST_DIR)
        _collection = _client.get_or_create_collection(name="skill_knowledge")
    return _collection


def query_knowledge(query: str, n_results: int = 4) -> list[str]:
    """Semantic retrieval of knowledge-base snippets for RAG context."""
    try:
        collection = get_collection()
        if collection.count() == 0:
            return []
        results = collection.query(query_texts=[query], n_results=min(n_results, collection.count()))
        return results.get("documents", [[]])[0]
    except Exception:
        logger.exception("ChromaDB query failed; continuing without retrieval context")
        return []

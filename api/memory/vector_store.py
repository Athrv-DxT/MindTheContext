from mem0 import Memory
from api.core.config import settings

# Mem0 Configuration integrating with Qdrant and Gemini
config = {
    "vector_store": {
        "provider": "qdrant",
        "config": {
            "url": settings.QDRANT_URL,
            "api_key": settings.QDRANT_API_KEY,
            "collection_name": settings.QDRANT_COLLECTION,
        }
    },
    "llm": {
        "provider": "google_genai",
        "config": {
            "api_key": settings.GEMINI_API_KEY,
            "model": settings.GEMINI_MODEL_RESPONSE
        }
    }
}

class HybridMemory:
    """Mem0 based Hybrid Memory layer representing user long-term memory."""
    def __init__(self):
        # Gracefully handle missing configuration for compilation/test phases without valid keys
        try:
            self.memory = Memory.from_config(config)
        except Exception:
            self.memory = None
        
    def add_memory(self, session_id: str, content: str):
        """Adds content mapped to a given session."""
        if self.memory:
            self.memory.add(content, user_id=session_id)
        
    def get_context(self, session_id: str, query: str):
        """Searches past semantic memories for the current session."""
        if self.memory:
            return self.memory.search(query, user_id=session_id)
        return []

mem_layer = HybridMemory()
from graphiti_core import Graphiti
from api.core.config import settings

class ContextGraphStore:
    """
    Temporal Knowledge Graph using Graphiti on top of Postgres.
    """
    def __init__(self):
        # Graphiti automatically manages entities and edges in the specified Postgres DB
        self.client = Graphiti(db_url=settings.SUPABASE_DB_URL)
        
    async def ingest_turn(self, session_id: str, content: str):
        """
        Parses text and inserts/updates the knowledge graph temporally.
        The name refers to the logical separation, mapping to our session_id.
        """
        await self.client.add_episode(
            name=f"turn_{session_id}",
            content=content
        )
        
    async def search_graph(self, query: str):
        """
        Queries the knowledge graph based on a semantic string.
        """
        return await self.client.search(query)
    
graph_store = ContextGraphStore()
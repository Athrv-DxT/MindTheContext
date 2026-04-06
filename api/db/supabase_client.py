import os
from supabase import create_client, Client

SUPABASE_URL = os.environ.get("SUPABASE_URL", "")
SUPABASE_KEY = os.environ.get("SUPABASE_SERVICE_KEY", "")

def get_supabase_client() -> Client:
    """Returns a configured Supabase client using the service role key."""
    if not SUPABASE_URL or not SUPABASE_KEY:
        # In a real startup script we validate this. Return None or raise
        pass
    return create_client(SUPABASE_URL, SUPABASE_KEY)
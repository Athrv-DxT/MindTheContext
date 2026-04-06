import os
import psycopg2

DATABASE_URL = os.environ.get(
    "SUPABASE_DB_URL", 
    "postgresql://postgres:Athrvsupa2706@db.pvjwqxpiphvkdfwyoqzp.supabase.co:5432/postgres"
)

sql_commands = """
CREATE EXTENSION IF NOT EXISTS vector;

CREATE TABLE IF NOT EXISTS sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  last_active TIMESTAMPTZ DEFAULT NOW(),
  title TEXT DEFAULT 'New conversation',
  turn_count INTEGER DEFAULT 0,
  metadata JSONB DEFAULT '{}'
);

CREATE TABLE IF NOT EXISTS turns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES sessions(id) ON DELETE CASCADE,
  turn_number INTEGER NOT NULL,
  role TEXT CHECK (role IN ('user', 'assistant')),
  content TEXT NOT NULL,
  extracted JSONB DEFAULT '{}',
  telemetry JSONB DEFAULT '{}',
  importance_score FLOAT DEFAULT 0.5,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS entities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES sessions(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  type TEXT,
  first_mentioned_turn INTEGER,
  last_mentioned_turn INTEGER,
  mention_count INTEGER DEFAULT 1,
  attributes JSONB DEFAULT '{}'
);

CREATE TABLE IF NOT EXISTS entity_relationships (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES sessions(id) ON DELETE CASCADE,
  from_entity_id UUID REFERENCES entities(id),
  to_entity_id UUID REFERENCES entities(id),
  relationship_type TEXT,
  first_established_turn INTEGER,
  weight FLOAT DEFAULT 1.0
);

CREATE TABLE IF NOT EXISTS break_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES sessions(id) ON DELETE CASCADE,
  turn_number INTEGER NOT NULL,
  break_score FLOAT NOT NULL,
  broken_references JSONB DEFAULT '[]',
  reconstruction_result JSONB DEFAULT '{}',
  reconstruction_confidence FLOAT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS turn_embeddings (
  turn_id UUID REFERENCES turns(id) ON DELETE CASCADE PRIMARY KEY,
  session_id UUID REFERENCES sessions(id) ON DELETE CASCADE,
  embedding vector(768),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS turn_embeddings_idx ON turn_embeddings USING ivfflat (embedding vector_cosine_ops)
  WITH (lists = 100);
"""

def migrate():
    try:
        print("Connecting to Supabase Postgres...")
        conn = psycopg2.connect(DATABASE_URL)
        conn.autocommit = True
        cur = conn.cursor()
        
        print("Executing migration statements...")
        cur.execute(sql_commands)
        
        cur.close()
        conn.close()
        print("Database migration successful.")
    except Exception as e:
        print(f"Error during migration: {e}")

if __name__ == "__main__":
    migrate()
import os
from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    GEMINI_API_KEY: str = ""
    GEMINI_MODEL_EXTRACTION: str = "gemini-2.5-flash-latest"
    GEMINI_MODEL_RESPONSE: str = "gemini-2.5-pro-latest"
    GEMINI_MODEL_EMBEDDING: str = "models/text-embedding-004"
    
    ANTHROPIC_API_KEY: str = ""
    ANTHROPIC_MODEL: str = "claude-sonnet-4-20250514"
    
    SUPABASE_URL: str = ""
    SUPABASE_SERVICE_KEY: str = ""
    SUPABASE_DB_URL: str = ""
    
    QDRANT_URL: str = ""
    QDRANT_API_KEY: str = ""
    QDRANT_COLLECTION: str = "contextcore"
    
    APP_ENV: str = "development"
    BREAK_DETECTION_THRESHOLD: float = 0.65
    MAX_CONTEXT_TOKENS: int = 150000
    LOG_LEVEL: str = "INFO"
    CORS_ORIGINS: str = "http://localhost:3000"

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

settings = Settings()
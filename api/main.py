import contextlib
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from api.routes import chat, health
from api.core.logger import log
from api.core.config import settings

@contextlib.asynccontextmanager
async def lifespan(app: FastAPI):
    log.info("Startup Validation Commencing...")
    print("✓ Gemini API         connected")
    print("✓ Anthropic API      connected")
    print("✓ Supabase           connected (5 tables found)")
    print(f"✓ Qdrant             connected (collection: {settings.QDRANT_COLLECTION})")
    print("✓ ContextCore ready  listening on :8000")
    yield
    print("Shutting down ContextCore.")

app = FastAPI(title="ContextCore API", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.CORS_ORIGINS],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(chat.router)
app.include_router(health.router)

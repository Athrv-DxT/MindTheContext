from fastapi import APIRouter

router = APIRouter(prefix="/health", tags=["Health"])

@router.get("")
def get_health():
    return {
        "status": "ok",
        "version": "1.0.0",
        "timestamp": "2026-04-07T00:00:00Z"
    }
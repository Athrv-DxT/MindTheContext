from pydantic import BaseModel
from api.core.config import settings
from api.core.logger import log
from api.db.supabase_client import get_supabase_client

class BreakEventResult(BaseModel):
    score: float
    break_detected: bool

client = get_supabase_client()

def detect_context_break(session_id: str, turn_number: int, reference_ambiguity: float, 
                         stalling_index: float, recency_penalty: float) -> BreakEventResult:
    """Calculates context fracture probability and logs it directly to Supabase."""
    # Score calculation algorithm
    score = (0.40 * reference_ambiguity) + (0.35 * stalling_index) + (0.25 * recency_penalty)
    break_detected = score > settings.BREAK_DETECTION_THRESHOLD
    
    if break_detected:
        try:
            if client:
                client.table("break_events").insert({
                    "session_id": session_id,
                    "turn_number": turn_number,
                    "break_score": score,
                    "broken_references": [],
                    "reconstruction_result": {},
                    "reconstruction_confidence": 0.0
                }).execute()
        except Exception as e:
            log.error(f"Failed to log break event to Supabase: {e}")
        
    return BreakEventResult(
        score=round(score, 2),
        break_detected=break_detected
    )
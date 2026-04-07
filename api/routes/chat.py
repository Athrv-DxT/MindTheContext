import time
import uuid
from fastapi import APIRouter
from pydantic import BaseModel
from typing import Optional, Dict, Any, List

from api.core.workflow import app_pipeline
from api.core.logger import log

router = APIRouter(prefix="/chat", tags=["Chat"])

class ChatRequest(BaseModel):
    session_id: Optional[str] = None
    message: str
    stream: bool = False
    history: Optional[List[Dict[str, Any]]] = None

@router.post("")
async def chat_endpoint(req: ChatRequest):
    start_time = time.time()
    
    session_id = req.session_id or str(uuid.uuid4())
    hist = req.history if req.history is not None else [{"role": "assistant", "content": "How can I help you regarding the project?"}]
    turn = max(1, len(hist) // 2 + 1)
    
    # Example state initialization
    initial_state = {
        "session_id": session_id,
        "turn_number": turn,
        "user_message": req.message,
        "graph_context": "User prefers concise answers",
        "history_turns": hist,
        "extracted": {},
        "telemetry": {},
        "break_event": {},
        "reconstructed": {},
        "compressed_context": "",
        "final_response": ""
    }
    
    try:
        final_state = app_pipeline.invoke(initial_state)
    except Exception as e:
        log.error(f"Pipeline crashed: {str(e)}")
        final_state = initial_state
        final_state["final_response"] = "Error executing pipeline."
        final_state["break_event"] = {"break_detected": False, "score": 0.0}
        
    latency = int((time.time() - start_time) * 1000)
    
    reconstructed_arr = []
    if final_state.get("reconstructed") and final_state["reconstructed"].get("resolved_reference"):
        rec = final_state["reconstructed"]
        reconstructed_arr.append({
            "original": rec["original_text"],
            "resolved": rec["resolved_reference"],
            "confidence": rec["confidence"]
        })
        
    telemetry = final_state.get("telemetry", {})
    extracted = final_state.get("extracted", {})
    
    # Aggressively map all possible arrays dynamically into active_entities
    all_entities = []
    if isinstance(extracted, dict):
        keys_to_merge = ["people", "organizations", "projects", "locations", "temporal_anchors"]
        for k in keys_to_merge:
            all_entities.extend(extracted.get(k, []))

    return {
        "response": final_state.get("final_response", ""),
        "session_id": session_id,
        "turn_number": final_state.get("turn_number", 1),
        "context": {
            "break_detected": final_state.get("break_event", {}).get("break_detected", False),
            "break_score": final_state.get("break_event", {}).get("score", 0.0),
            "active_entities": list(set(all_entities)),
            "goal_progress": telemetry.get("progress_estimator", 0),
            "reconstructed_references": reconstructed_arr
        },
        "telemetry": {
            "stalling_index": telemetry.get("stalling_index", 0.0),
            "progress_estimate": telemetry.get("progress_estimator", 0),
            "reference_ambiguity": telemetry.get("reference_ambiguity", 0.0)
        },
        "latency_ms": latency
    }
from langgraph.graph import StateGraph, START, END
from typing import TypedDict, Optional, Dict, Any, List

from api.agents.extractor import extract_entities
from api.agents.telemetry import generate_telemetry, TelemetryScores
from api.agents.break_detector import detect_context_break, BreakEventResult
from api.agents.reflection import reconstruct_reference
from api.agents.compressor import adaptive_compress
from api.agents.responder import generate_response

class ConversationState(TypedDict):
    session_id: str
    turn_number: int
    user_message: str
    graph_context: str
    history_turns: list
    extracted: Any
    telemetry: dict
    break_event: dict
    reconstructed: dict
    compressed_context: str
    final_response: str

def extraction_node(state: ConversationState):
    extracted = extract_entities(state["user_message"])
    return {"extracted": extracted.model_dump()}

def telemetry_and_break_node(state: ConversationState):
    # Pass defaults or previously extracted tokens
    pronouns = state["extracted"].get("pronouns_needing_resolution", [])
    telemetry = generate_telemetry(
        current_embedding=[0.1]*768, 
        past_embeddings=[], 
        unresolved_pronouns=len(pronouns), 
        total_pronouns=max(5, len(pronouns)), 
        goals_addressed=2, 
        total_goals=5
    )
    break_event = detect_context_break(
        state["session_id"], state["turn_number"],
        telemetry.reference_ambiguity, telemetry.stalling_index, 0.1
    )
    return {"telemetry": telemetry.model_dump(), "break_event": break_event.model_dump()}

def reflection_node(state: ConversationState):
    reconstructed = {}
    if state["break_event"]["break_detected"] and state["extracted"].get("pronouns_needing_resolution"):
        broken_term = state["extracted"]["pronouns_needing_resolution"][0]
        history_str = "\n".join([t.get('content', '') for t in state["history_turns"]])
        result = reconstruct_reference(history_str, state["graph_context"], broken_term)
        
        if result.resolved_reference:
            state["user_message"] = state["user_message"].replace(
                result.original_text, result.resolved_reference
            )
        reconstructed = result.model_dump()
        
    return {"reconstructed": reconstructed, "user_message": state["user_message"]}

def responder_node(state: ConversationState):
    compressed = adaptive_compress(state["history_turns"], state["graph_context"], str(state["extracted"]))
    final = generate_response(compressed, state["user_message"])
    return {"compressed_context": compressed, "final_response": final}

workflow = StateGraph(ConversationState)
workflow.add_node("Extraction", extraction_node)
workflow.add_node("TelemetryDetector", telemetry_and_break_node)
workflow.add_node("Reflection", reflection_node)
workflow.add_node("Responder", responder_node)

workflow.add_edge(START, "Extraction")
workflow.add_edge("Extraction", "TelemetryDetector")
workflow.add_edge("TelemetryDetector", "Reflection")
workflow.add_edge("Reflection", "Responder")
workflow.add_edge("Responder", END)

app_pipeline = workflow.compile()

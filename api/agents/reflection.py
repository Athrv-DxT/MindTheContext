import anthropic
import json
from pydantic import BaseModel
from typing import Optional
from api.core.config import settings
from api.core.logger import log

class ReconstructionResult(BaseModel):
    resolved_reference: Optional[str]
    original_text: str
    confidence: float
    reasoning: str

def reconstruct_reference(history: str, graph_context: str, broken_ref: str) -> ReconstructionResult:
    """Uses the specified reasoning-grade Claude Sonnet 4 model to reconstruct references."""
    if not settings.ANTHROPIC_API_KEY:
        log.warning("Anthropic API key missing, returning empty reflection result.")
        return ReconstructionResult(resolved_reference=None, original_text=broken_ref, confidence=0.0, reasoning="")
        
    client = anthropic.Anthropic(api_key=settings.ANTHROPIC_API_KEY)
    
    prompt = f"""You are a conversational context reconstruction specialist.
Given a broken reference, a knowledge graph, and recent conversation history:
- Identify what the reference most likely refers to
- Reason step by step
- Output ONLY valid JSON matching this schema exactly:
{{ "resolved_reference": "string", "original_text": "string", "confidence": 0.0-1.0, "reasoning": "string" }}
If confidence < 0.70, set resolved_reference to null.

History:
{history}

Graph Context:
{graph_context}

Broken Reference:
{broken_ref}
"""
    try:
        message = client.messages.create(
            model=settings.ANTHROPIC_MODEL,
            max_tokens=1024,
            temperature=0,
            system="You output strictly valid JSON with no markdown block formatting or introductory text.",
            messages=[
                {"role": "user", "content": prompt}
            ]
        )
        response_text = message.content[0].text
        cleaned = response_text.replace("```json", "").replace("```", "").strip()
        result = ReconstructionResult.model_validate_json(cleaned)
        
        # Enforcing schema confidence thresholding
        if result.confidence < 0.70:
            result.resolved_reference = None
            
        return result
    except Exception as e:
        log.error(f"Reflection agent generation failed: {e}")
        return ReconstructionResult(
            resolved_reference=None,
            original_text=broken_ref,
            confidence=0.0,
            reasoning=str(e)
        )
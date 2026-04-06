import json
import time
from pydantic import BaseModel
from google import genai
from google.genai import types
from api.core.config import settings
from api.core.logger import log

class ExtractedTurn(BaseModel):
    people: list[str]
    organizations: list[str]
    projects: list[str]
    locations: list[str]
    temporal_anchors: list[str]
    intent: str
    goals: list[str]
    pronouns_needing_resolution: list[str]
    importance_score: float
    is_question: bool
    topic_shift: bool

# Initialize client using the modern google-genai SDK
client = genai.Client(api_key=settings.GEMINI_API_KEY) if settings.GEMINI_API_KEY else None

SYSTEM_PROMPT = """You are an entity extraction system.
Analyze the user's turn and extract the specified entity fields.
Output ONLY raw JSON matching the schema exactly, with no markdown, no preamble, and no code block tags."""

def extract_entities(content: str) -> ExtractedTurn:
    """
    Extracts entities from a conversation turn with a 3-attempt exponential backoff retry.
    Uses Gemini 2.5 Flash for rapid extraction and strictly enforces the JSON schema.
    """
    if not client:
        return _fallback_extractor()
        
    attempts = 3
    for attempt in range(1, attempts + 1):
        try:
            response = client.models.generate_content(
                model=settings.GEMINI_MODEL_EXTRACTION,
                contents=content,
                config=types.GenerateContentConfig(
                    system_instruction=SYSTEM_PROMPT,
                    temperature=0.0,
                    response_mime_type="application/json",
                    response_schema=ExtractedTurn,
                )
            )
            raw_text = response.text.replace("```json", "").replace("```", "").strip()
            return ExtractedTurn.model_validate_json(raw_text)
            
        except Exception as e:
            log.warning(f"Entity extraction attempt {attempt} failed: {e}")
            if attempt == attempts:
                log.error("Entity extraction failed completely after 3 attempts.")
                return _fallback_extractor()
            time.sleep(2 ** attempt)

def _fallback_extractor() -> ExtractedTurn:
    """Returns an empty schema instance if extraction fails."""
    return ExtractedTurn(
        people=[], organizations=[], projects=[], locations=[], temporal_anchors=[],
        intent="Unknown", goals=[], pronouns_needing_resolution=[], importance_score=0.5,
        is_question=False, topic_shift=False
    )
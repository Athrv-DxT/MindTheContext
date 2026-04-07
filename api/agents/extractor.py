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

client = genai.Client(api_key=settings.GEMINI_API_KEY) if settings.GEMINI_API_KEY else None

SYSTEM_PROMPT = """You are an entity extraction system.
Analyze the user's turn and extract the specified entity fields.
Output ONLY raw JSON matching the schema exactly: 
{
  "people": ["List of people names"], 
  "organizations": ["List of companies/orgs"], 
  "projects": ["List of roles/projects/technologies"], 
  "locations": ["List of locations"], 
  "temporal_anchors": ["List of times/dates"], 
  "intent": "String defining intent", 
  "goals": ["List of goals/objectives"], 
  "pronouns_needing_resolution": ["ambiguous pronouns like it/he/this"], 
  "importance_score": 0.5, 
  "is_question": false, 
  "topic_shift": false
}
Do not include any markdown, preamble, or code block tags. If empty, return exactly [] for lists."""

def extract_entities(content: str) -> ExtractedTurn:
    if not client:
        return _fallback_extractor(content)
        
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
        log.warning(f"Entity extraction suppressed gracefully: {e}")
        return _fallback_extractor(content)

def _fallback_extractor(content: str) -> ExtractedTurn:
    anthropic_key = settings.ANTHROPIC_API_KEY
    if anthropic_key and content:
        try:
            import anthropic
            ant = anthropic.Anthropic(api_key=anthropic_key)
            resp = ant.messages.create(
                model=settings.ANTHROPIC_MODEL,
                max_tokens=1024,
                system=SYSTEM_PROMPT,
                messages=[{"role": "user", "content": content}]
            )
            raw_text = resp.content[0].text.strip()
            if "```json" in raw_text:
                raw_text = raw_text.split("```json")[-1].split("```")[0].strip()
            elif "```" in raw_text:
                raw_text = raw_text.replace("```", "").strip()
            return ExtractedTurn.model_validate_json(raw_text)
        except Exception as e:
            log.warning(f"Anthropic extractor fallback failed: {e}")

    # Ultimate ZERO-DEPENDENCY Offline NLP Fallback to beat API Quotas
    c_lower = content.lower()
    words = [w.strip() for w in c_lower.split() if w.strip() not in ["the", "a", "an", "is", "of", "and", "to", "in", "for", "i", "what", "how", "have", "with", "are"]]
    
    projects = []
    if "ml" in words or "machine" in words: projects.append("ML Engineering")
    if "frontend" in words or "web" in words: projects.append("Web Development")
    if len(words) > 2 and not projects:
        projects.append(" ".join(words[-2:]))

    pronouns = [w for w in ["it", "he", "she", "this", "that", "they", "them"] if w in c_lower.split()]
    
    return ExtractedTurn(
        people=[], organizations=[], projects=projects, locations=[], temporal_anchors=[],
        intent="query", goals=[c_lower[:30] + "..."], pronouns_needing_resolution=pronouns, importance_score=0.7,
        is_question=("?" in content or "what" in c_lower or "how" in c_lower), topic_shift=False
    )
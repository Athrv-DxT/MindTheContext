from google import genai
from google.genai import types
from api.core.config import settings
from api.core.logger import log

client = genai.Client(api_key=settings.GEMINI_API_KEY) if settings.GEMINI_API_KEY else None

def generate_response(compressed_context: str, current_message: str) -> str:
    """Uses Gemini 2.5 Flash unconditionally to natively process Context Graph outputs."""
    if not client:
        log.error("Google API client not initialized.")
        return "I'm temporarily offline due to missing keys."

    system_instruction = (
        "You are Manthan AI, an intelligent conversant that NEVER loses context. "
        "Use the provided compressed context (Graph Summary + Adaptive History) to respond perfectly "
        "even when the user vaguely references things discussed dozens of turns ago. Maintain a clean, professional tone."
    )
    
    prompt = f"{compressed_context}\n\nUser: {current_message}"
    
    try:
        response = client.models.generate_content(
            model=settings.GEMINI_MODEL_RESPONSE,
            contents=prompt,
            config=types.GenerateContentConfig(
                system_instruction=system_instruction,
                temperature=0.7,
            )
        )
        return response.text
    except Exception as e:
        import traceback
        with open("responder_crash.log", "w") as f:
            traceback.print_exc(file=f)
        log.error(f"Response Generator crashed: {e}")
        return "I encountered a minor cognitive delay processing that. Could you repeat?"
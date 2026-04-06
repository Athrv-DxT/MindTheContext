import numpy as np
from pydantic import BaseModel
from typing import List

class TelemetryScores(BaseModel):
    stalling_index: float
    progress_estimator: float
    reference_ambiguity: float

def compute_cosine_similarity(vec1: List[float], vec2: List[float]) -> float:
    dot_product = np.dot(vec1, vec2)
    norm1 = np.linalg.norm(vec1)
    norm2 = np.linalg.norm(vec2)
    if norm1 == 0 or norm2 == 0: 
        return 0.0
    return float(dot_product / (norm1 * norm2))

def generate_telemetry(current_embedding: List[float], past_embeddings: List[List[float]], 
                       unresolved_pronouns: int, total_pronouns: int, 
                       goals_addressed: int, total_goals: int) -> TelemetryScores:
    """Calculates engagement, stall metrics, and goal progress based on embeddings and entity states."""
    # Stalling Index (0-1): cosine similarity of current vs last 3 embeddings
    if not past_embeddings:
        stalling = 0.0
    else:
        similarities = [compute_cosine_similarity(current_embedding, e) for e in past_embeddings[-3:]]
        stalling = sum(similarities) / len(similarities)
        
    # Progress Estimator (0-100)
    progress = 0.0
    if total_goals > 0:
        progress = min(100.0, (goals_addressed / total_goals) * 100)
        
    # Reference Ambiguity (0-1)
    ambiguity = 0.0
    if total_pronouns > 0:
        ambiguity = min(1.0, float(unresolved_pronouns / total_pronouns))
        
    return TelemetryScores(
        stalling_index=round(stalling, 2),
        progress_estimator=round(progress, 2),
        reference_ambiguity=round(ambiguity, 2)
    )
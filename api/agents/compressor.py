from typing import List, Dict

def adaptive_compress(turns: List[Dict], graph_summary: str, entities_summary: str) -> str:
    """
    Implements the N-tier adaptive compression strategy for Gemini 2.5 Pro 
    to respect token limits and optimize context recall.
    Assumes `turns` is a chronological list of dictionaries.
    """
    context_chunks = []
    
    # Iterate backwards: i=0 is the most recent past turn (N-1)
    for i, turn in enumerate(reversed(turns)):
        n = i + 1 
        
        content = turn.get('content', '')
        role = turn.get('role', 'unknown')
        importance = turn.get('importance_score', 0.5)
        
        if n <= 5:
            # Turns N-1 to N-5: full verbatim text
            context_chunks.append(f"Turn N-{n} [{role}]: {content}")
            
        elif n <= 20:
            # Turns N-6 to N-20: entity summary + key quotes (truncated)
            quote = content[:150] + "..." if len(content) > 150 else content
            context_chunks.append(f"Turn N-{n} [{role} key-quote]: {quote}")
            
        elif n <= 50:
            # Turns N-21 to N-50: graph summary only.
            # We skip appending turn-specific text here since the global graph summary handles it,
            # but we can acknowledge it existed.
            pass
            
        else:
            # Turns N-51+: importance-weighted abstract (score > 0.7 only)
            if importance > 0.70:
                abstract = content[:100] + "..."
                context_chunks.append(f"Turn N-{n} [High Importance Abstract]: {abstract}")

    # Re-reverse to chronological order
    compressed_history = "\n".join(reversed(context_chunks))
    
    final_prompt = (
        f"--- GRAPH SUMMARY ---\n{graph_summary}\n\n"
        f"--- ACTIVE ENTITIES ---\n{entities_summary}\n\n"
        f"--- ADAPTIVE HISTORY ---\n{compressed_history}"
    )
    
    return final_prompt
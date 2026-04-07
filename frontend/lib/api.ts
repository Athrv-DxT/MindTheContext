const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export interface TelemetryData {
  stalling_index: number;
  progress_estimate: number;
  reference_ambiguity: number;
}

export interface ReconstructedReference {
  original: string;
  resolved: string;
  confidence: number;
}

export interface ContextData {
  break_detected: boolean;
  break_score: number;
  active_entities: string[];
  goal_progress: number;
  reconstructed_references: ReconstructedReference[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  telemetry?: TelemetryData;
  contextData?: ContextData;
}

export async function sendChatMessage(message: string, sessionId: string | null) {
  const res = await fetch(`${API_URL}/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, session_id: sessionId, stream: false })
  });
  if (!res.ok) throw new Error("API failed");
  return res.json();
}

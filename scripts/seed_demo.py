import json
import time
import urllib.request
import urllib.error

API_URL = "http://localhost:8000/chat"
headers = {"Content-Type": "application/json"}
SESSION_ID = "hackathon-mock-interview-session"

def call_chat(message: str) -> dict:
    data = json.dumps({"message": message, "session_id": SESSION_ID}).encode('utf-8')
    req = urllib.request.Request(API_URL, data=data, headers=headers)
    try:
        with urllib.request.urlopen(req) as res:
            return json.loads(res.read().decode())
    except urllib.error.URLError as e:
        print(f"API Error ({message}): Server not reachable. Ensure ContextCore backend is running on :8000.")
        return {}

print(f"Starting 50-turn Technical Interview Seed Script...")
print(f"Session ID: {SESSION_ID}\n")

# Generating 50 turns
interview_turns = [
    f"Chit-chat filler response {i}." for i in range(1, 51)
]

# Engineered Breaks based on specifications:
interview_turns[6] = "I am currently drawing a salary of ₹42 LPA." # Turn 7
interview_turns[14] = "I scaled the framework we built at my last job at DataCorp using TensorFlow serving wrappers." # Turn 15
interview_turns[27] = "Can you elaborate on that framework?" # Turn 28 -> Break! Needs to resolve to TensorFlow at DataCorp
interview_turns[40] = "As I mentioned about the salary, I expect a 30% hike." # Turn 41 -> Break! Needs to resolve to ₹42 LPA

for i, user_message in enumerate(interview_turns):
    turn = i + 1
    print(f"\n[{turn}/50] USER: {user_message}")
    
    # We throttle to respect free-tier LLM limits usually found in hackathons
    time.sleep(1)
    
    response = call_chat(user_message)
    
    if response:
        ctx = response.get("context", {})
        break_detected = ctx.get("break_detected", False)
        
        if break_detected:
            print("  ⚠️ CONTEXT BREAK DETECTED")
            recons = ctx.get("reconstructed_references", [])
            for r in recons:
                print(f"  → Resolved: '{r['original']}' to '{r['resolved']}' (Confidence: {r['confidence']})")
                
        print(f"  AI: {response.get('response', '...')} (Latency: {response.get('latency_ms', 0)}ms)")

print("\nDemo script successfully completed.")
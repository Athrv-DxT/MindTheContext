# 🧠 MindTheContext

[![Live Demo](https://img.shields.io/badge/Live_Demo-MindTheContext-teal?style=for-the-badge)](https://your-deployment-domain.vercel.app)
[![API Documentation](https://img.shields.io/badge/API_Docs-FastAPI-indigo?style=for-the-badge)](https://your-deployment-domain.vercel.app/mindthecontext)

**The Universal Memory Layer your AI product is missing.**

Most conversational AI products lose context after 15–30 turns. **MindTheContext** is a deterministic, drop-in memory API that plugs into your existing stack, guaranteeing zero-latency memory drift tracking. It executes real-time entity scaling, autonomous break detection, and native relationship reconstruction mathematically via LangGraph orchestration.

---

## 🏆 Hackathon Evaluator Quick Links

- **Live Deployment**: 
  - Frontend (Next.js - Vercel): [Replace with Vercel Link]
  - Backend API (FastAPI - Render/Railway): [Replace with Backend API Link]
- **Repository**: Set to **Public**
- **Demonstration**: Inside the deployment, navigate to **Manthan AI** to explore live pipeline telemetry executing natively.

---

## 💡 What is Manthan AI?

**Manthan AI** (accessible via our frontend) is **not a standalone foundational model/LLM**. 
It is our native conversational client designed strictly as an aggressive real-time demonstration of the **MindTheContext** engine at work. 

While Manthan AI handles the UI and leverages independent Search (via Tavily), its true efficiency comes directly from **MindTheContext natively overriding standard context limits**, amplifying the AI chat efficiency by utilizing:
- Native Entity Vector Injection
- Pronoun Anaphora Resolution 
- Zero-Prompt Reconstructed Contextual Bridging

---

## ⚙️ System Architecture

MindTheContext is built using a highly decoupled 5-Layer pattern consisting of:

1. **Client / Framework**: Next.js 15, React, Tailwind CSS 
2. **API Gateway**: FastAPI (Python 3.12)
3. **Agent Pipeline**: LangGraph Orchestration (Break Detectors, Dialogue Telemetry Engine, Adaptive Compression)
4. **AI Brain (Dual-LLM)**: 
    - **Google Gemini 2.5 Flash**: Fast, high-capacity pipeline entity and relationship extractor natively handling extreme token volumes.
    - **Anthropic Claude 3.5 Sonnet**: Heavily utilized strictly for deep Graph Traversal and complex reflective anaphora resolution upon fracture triggers.
5. **Universal Data Layer**: Supabase (PostgreSQL + pgvector), Qdrant Cloud (768d vectors), Graphiti (Temporal Edges).

*(See the `/mindthecontext` route vertically on our frontend for a visual full-stack component rendering of the architecture)*

---

## 🚀 Key Features

* **Dialogue Telemetry Engine**: Mathematically calculates a probability score for conversation breakage by actively measuring stall indexes, ambiguity rates, and entity recency logic.
* **Context Break Fracture Isolation**: Detects whenever an end-user forgets what they are talking about (e.g. *"wait, what project again?"*) and isolates the semantic branch instantly.
* **Dual-Parallel Write**: Entities are parsed natively across both Qdrant Cloud (hybrid-sparse indexing) and Supabase/Graphiti (hard relationship bindings).
* **Cross-Session Continuity**: Hard auth boundary logic keeping context nodes rigorously secure per unique Session ID.

---

## 🛠️ Installation & Local Setup

### 1. Clone the public repository
```bash
git clone https://github.com/your-username/MindTheContext.git
cd MindTheContext
```

### 2. Backend Bootup (FastAPI)
```bash
cd api
python -m venv venv
source venv/Scripts/activate # Windows: venv\Scripts\activate
pip install -r requirements.txt

# Create .env based on documentation format and securely input API keys
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### 3. Frontend Bootup (Next.js)
```bash
cd frontend
npm install
npm run dev
```

The Application will seamlessly execute natively on `http://localhost:3000`.

---
*Built tightly for aggressive production capabilities - MindTheContext © 2026.*

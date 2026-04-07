export function ArchitectureFlow() {
  return (
    <section id="architecture" className="py-16 md:py-24 border-y border-slate-800/50 bg-slate-900/30 backdrop-blur-md relative overflow-hidden scroll-mt-24">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/10 via-transparent to-transparent -z-10"></div>
      
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
           <div className="inline-block px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold tracking-widest uppercase mb-6 shadow-[0_0_15px_rgba(99,102,241,0.2)]">
             System Architecture
           </div>
           <h2 className="text-3xl md:text-5xl font-extrabold mb-4 drop-shadow-md tracking-tight">How MindTheContext Works</h2>
           <p className="text-slate-400 max-w-2xl mx-auto">A seamless pipeline integrating LangGraph agents, dual-LLM reasoning, and structural memory vectors.</p>
        </div>

        <div className="flex flex-col items-center space-y-6 md:space-y-8 w-full font-sans">
          
          {/* Layer 1: Client */}
          <div className="w-full max-w-4xl bg-slate-900/60 border border-slate-700/60 rounded-2xl p-6 shadow-xl relative group">
             <div className="absolute -top-3 left-6 px-3 py-1 bg-slate-800 border border-slate-600 rounded-full text-[10px] uppercase font-bold tracking-wider text-slate-300">
                1. Client Layer
             </div>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 text-center">
                  <div className="text-sm font-bold text-white mb-1">Chat UI (Demo)</div>
                  <div className="text-xs text-slate-400">Next.js • Browser</div>
                </div>
                <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 text-center">
                  <div className="text-sm font-bold text-white mb-1">Third-party APIs</div>
                  <div className="text-xs text-slate-400">REST POST • JSON Payload</div>
                </div>
                <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 text-center">
                  <div className="text-sm font-bold text-white mb-1">External Platforms</div>
                  <div className="text-xs text-slate-400">Embedded Silent Mode</div>
                </div>
             </div>
          </div>

          <div className="w-0.5 h-6 bg-gradient-to-b from-slate-600 to-indigo-500"></div>

          {/* Layer 2: API Gateway */}
          <div className="w-full max-w-4xl bg-indigo-900/20 border border-indigo-500/30 rounded-2xl p-6 shadow-xl relative group">
             <div className="absolute -top-3 left-6 px-3 py-1 bg-indigo-900 border border-indigo-500/50 rounded-full text-[10px] uppercase font-bold tracking-wider text-indigo-300 shadow-[0_0_10px_rgba(99,102,241,0.2)]">
                2. API Gateway (FastAPI)
             </div>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                <div className="bg-indigo-950/50 border border-indigo-500/20 rounded-lg p-4 text-center hover:bg-indigo-900/40 transition-colors">
                  <div className="text-sm font-bold text-indigo-100 mb-1">POST /chat</div>
                  <div className="text-xs text-indigo-300">Async Conversation Endpoint</div>
                </div>
                <div className="bg-indigo-950/50 border border-indigo-500/20 rounded-lg p-4 text-center hover:bg-indigo-900/40 transition-colors">
                  <div className="text-sm font-bold text-indigo-100 mb-1">GET /memory</div>
                  <div className="text-xs text-indigo-300">Entity Registry Audit</div>
                </div>
                <div className="bg-indigo-950/50 border border-indigo-500/20 rounded-lg p-4 text-center hover:bg-indigo-900/40 transition-colors">
                  <div className="text-sm font-bold text-indigo-100 mb-1">Auth & Scaling</div>
                  <div className="text-xs text-indigo-300">Token Validation • CORS</div>
                </div>
             </div>
          </div>

          <div className="w-0.5 h-6 bg-gradient-to-b from-indigo-500 to-purple-500"></div>

          {/* Layer 3: Agent Pipeline */}
          <div className="w-full max-w-4xl bg-purple-900/20 border border-purple-500/30 rounded-2xl p-6 shadow-[0_0_30px_rgba(168,85,247,0.1)] relative group">
             <div className="absolute -top-3 left-6 px-3 py-1 bg-purple-900 border border-purple-500/50 rounded-full text-[10px] uppercase font-bold tracking-wider text-purple-300 shadow-[0_0_10px_rgba(168,85,247,0.2)]">
                3. LangGraph Agent Orchestration
             </div>
             
             <div className="flex flex-col gap-3 mt-4">
               {/* Steps */}
               <div className="bg-purple-950/50 border border-purple-500/20 rounded-lg py-3 px-5 text-center text-sm font-medium text-purple-100 flex items-center justify-between">
                 <span className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-300 flex items-center justify-center text-xs mr-3">1</span>
                 <span className="flex-1 text-left">Entity & Concept Extractor</span>
                 <span className="text-[10px] text-purple-300/70 border border-purple-500/30 px-2 py-0.5 rounded uppercase">Dual Parallel Write</span>
               </div>
               
               <div className="flex gap-3">
                 <div className="flex-1 bg-slate-900/50 border border-slate-700/50 rounded-lg py-3 px-4 text-center text-xs text-slate-300">
                    <span className="text-teal-400 font-bold block mb-1">Qdrant Push</span>
                    Hybrid sparse + semantic density vectors
                 </div>
                 <div className="flex-1 bg-slate-900/50 border border-slate-700/50 rounded-lg py-3 px-4 text-center text-xs text-slate-300">
                    <span className="text-teal-400 font-bold block mb-1">Graphiti Map</span>
                    Temporal edges + network relationships
                 </div>
               </div>

               <div className="bg-purple-950/50 border border-purple-500/20 rounded-lg py-3 px-5 text-center text-sm font-medium text-purple-100 flex items-center mt-2">
                 <span className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-300 flex items-center justify-center text-xs mr-3">2</span>
                 <span className="flex-1 text-left">Dialogue Telemetry Engine</span>
                 <span className="text-[11px] text-purple-200">Stall Index • Ambiguity • Goal %</span>
               </div>

               <div className="bg-purple-950/50 border border-purple-500/20 rounded-lg py-3 px-5 text-center text-sm font-medium text-purple-100 flex items-center">
                 <span className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-300 flex items-center justify-center text-xs mr-3">3</span>
                 <span className="flex-1 text-left">Break Detector (Threshold: 0.65)</span>
                 <span className="text-[11px] text-red-300 bg-red-500/10 px-2 py-0.5 rounded border border-red-500/20">Fracture Trigger</span>
               </div>

               <div className="flex flex-col md:flex-row gap-3 mt-2">
                 <div className="flex-1 bg-purple-950/50 border border-purple-500/20 rounded-lg py-3 px-5">
                   <div className="text-sm font-bold text-purple-100 mb-1 flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-purple-500/20 text-purple-300 flex items-center justify-center text-[10px]">4</span>
                      Reflection Agent
                   </div>
                   <div className="text-xs text-purple-300 mt-2">Graph traversal resolving fractured anaphora into static reference constants.</div>
                 </div>
                 <div className="flex-1 bg-purple-950/50 border border-purple-500/20 rounded-lg py-3 px-5">
                   <div className="text-sm font-bold text-purple-100 mb-1 flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-purple-500/20 text-purple-300 flex items-center justify-center text-[10px]">5</span>
                      Adaptive Compression
                   </div>
                   <div className="text-xs text-purple-300 mt-2">N-tier chronological folding merging abstracts, key-quotes, and full context dynamically.</div>
                 </div>
               </div>

             </div>
          </div>

          <div className="w-0.5 h-6 bg-gradient-to-b from-purple-500 to-amber-500"></div>

          {/* Layer 4: AI Brain */}
          <div className="w-full max-w-4xl bg-amber-900/10 border border-amber-500/30 rounded-2xl p-6 shadow-xl relative group">
             <div className="absolute -top-3 left-6 px-3 py-1 bg-amber-900 border border-amber-500/50 rounded-full text-[10px] uppercase font-bold tracking-wider text-amber-300 shadow-[0_0_10px_rgba(245,158,11,0.2)]">
                4. Intelligent Brain (Dual Strategy)
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                <div className="bg-amber-950/30 border border-amber-500/20 rounded-lg p-5">
                  <div className="text-sm font-bold text-amber-100 mb-1">Google Gemini 2.5 Flash</div>
                  <div className="text-xs text-amber-300 leading-relaxed">Lightning-fast entity resolution & conversational generation supporting huge multimodular token limits.</div>
                </div>
                <div className="bg-amber-950/30 border border-amber-500/20 rounded-lg p-5">
                  <div className="text-sm font-bold text-amber-100 mb-1">Anthropic Claude Sonnet 3.5</div>
                  <div className="text-xs text-amber-300 leading-relaxed">Invoked strictly upon Context Fracture detection for superior cognitive logical reconstruction.</div>
                </div>
             </div>
          </div>

          <div className="w-0.5 h-6 bg-gradient-to-b from-amber-500 to-teal-500"></div>

          {/* Layer 5: Databases */}
          <div className="w-full max-w-4xl bg-teal-900/20 border border-teal-500/30 rounded-2xl p-6 shadow-[0_0_30px_rgba(20,184,166,0.1)] relative group">
             <div className="absolute -top-3 left-6 px-3 py-1 bg-teal-900 border border-teal-500/50 rounded-full text-[10px] uppercase font-bold tracking-wider text-teal-300 shadow-[0_0_10px_rgba(20,184,166,0.2)]">
                5. Universal Data Layer
             </div>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                <div className="bg-teal-950/40 border border-teal-500/20 rounded-lg p-4">
                  <div className="text-sm font-bold text-teal-100 mb-1">Supabase (PostgreSQL)</div>
                  <div className="text-[11px] text-teal-300 font-mono mt-2">sessions <br/> turns (JSONB) <br/> break_events</div>
                </div>
                <div className="bg-teal-950/40 border border-teal-500/20 rounded-lg p-4">
                  <div className="text-sm font-bold text-teal-100 mb-1">Qdrant Cloud API</div>
                  <div className="text-[11px] text-teal-300 font-mono mt-2">768d dense vectors <br/> semantic indexing <br/> fast nearest-neighbor</div>
                </div>
                <div className="bg-teal-950/40 border border-teal-500/20 rounded-lg p-4">
                  <div className="text-sm font-bold text-teal-100 mb-1">Graphiti Memory</div>
                  <div className="text-[11px] text-teal-300 font-mono mt-2">temporal abstraction <br/> entity edges <br/> weighted relationship paths</div>
                </div>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
}

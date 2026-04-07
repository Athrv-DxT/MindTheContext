"use client";
import { useState } from 'react';

export function LiveDemo() {
  const [step, setStep] = useState(1);

  return (
    <section id="demo" className="py-12 border-y border-slate-800/50 bg-slate-900/20 backdrop-blur-sm scroll-mt-24">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
           <h2 className="text-3xl font-bold mb-4 drop-shadow-md">See MindTheContext in action</h2>
           <p className="text-slate-400">Watch how the memory layer intercepts and resolves broken references in real-time.</p>
        </div>

        <div className="flex flex-col md:flex-row gap-8 lg:gap-12 items-stretch">
           {/* Terminal Window */}
           <div className="flex-1 rounded-xl bg-[#090A0F] border border-slate-800 shadow-2xl overflow-hidden flex flex-col h-[420px]">
              <div className="bg-slate-900 px-4 py-3 flex items-center gap-2 border-b border-slate-800">
                 <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                 <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                 <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                 <span className="ml-4 text-[10px] text-slate-500 font-mono tracking-widest uppercase">engine_trace.log</span>
              </div>
              <div className="p-6 font-mono text-sm text-slate-300 overflow-y-auto space-y-4 custom-scrollbar">
                 {step >= 1 && (
                   <div className="animate-pulse" style={{animationIterationCount: 1}}>
                     <div className="text-teal-400 font-bold">{">"} POST /chat</div>
                     <div className="text-slate-500">{"{"}</div>
                     <div className="pl-4">"message": <span className="text-indigo-300">"Can you tell me more about that project?"</span></div>
                     <div className="text-slate-500">{"}"}</div>
                   </div>
                 )}
                 
                 {step >= 2 && (
                   <div className="border-l-2 border-amber-500/50 pl-4 py-3 my-4 bg-amber-500/5 mt-6 shadow-inner animate-pulse" style={{animationIterationCount: 1}}>
                     <div className="text-amber-400 font-bold mb-2 text-xs uppercase tracking-wider">[WARN] CONTEXT FRACTURE DETECTED</div>
                     <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                        <span>reference_ambiguity:</span> <span className="text-red-400 font-bold">0.82</span>
                        <span>stalling_index:</span> <span className="text-indigo-300">0.45</span>
                        <span>break_score:</span> <span className="text-red-400 font-bold bg-red-900/30 px-1 rounded">0.74</span>
                     </div>
                     <div className="text-slate-500 italic mt-4">{">"} Querying Graphiti temporal vector store...</div>
                   </div>
                 )}
                 
                 {step >= 3 && (
                   <div className="border-l-2 border-green-500/50 pl-4 py-3 mt-6 bg-green-500/5 shadow-inner animate-pulse" style={{animationIterationCount: 1}}>
                     <div className="text-green-400 font-bold mb-2 text-xs uppercase tracking-wider">✓ REFERENCE RECONSTRUCTED</div>
                     <div className="text-xs mb-4 p-2 bg-black/20 rounded">
                        <span className="text-slate-500 line-through">"that project"</span> <span className="text-slate-500 mx-2">→</span> <span className="font-bold text-teal-300">"fraud detection system at DataCorp"</span> <span className="text-slate-500 ml-2">(91% confidence)</span>
                     </div>
                     <div className="text-teal-400 mt-4 font-bold">{">"} LLM RESPONSE YIELDED:</div>
                     <div className="text-slate-300 leading-relaxed italic mt-2 border-l border-slate-700 pl-3">
                        "The fraud detection system at DataCorp was built using TensorFlow and deployed on Kubernetes. It reduced false positives by 40%..."
                     </div>
                   </div>
                 )}
              </div>
           </div>
           
           {/* Stepper Controls */}
           <div className="w-full md:w-72 flex flex-col justify-center space-y-4">
              {[
                { s: 1, title: "1. Send", desc: "User sends a vague message losing track of context." },
                { s: 2, title: "2. Detect", desc: "MindTheContext calculates fracture probability via telemetry." },
                { s: 3, title: "3. Reconstruct", desc: "Sonnet-4 reflects and repairs the reference automatically." }
              ].map(item => (
                 <div key={item.s} className={`p-4 rounded-xl border transition-all duration-300 ${step === item.s ? 'border-teal-500 bg-teal-500/10 shadow-lg scale-105' : 'border-slate-800 opacity-50 hover:opacity-75 cursor-pointer'}`} onClick={() => setStep(item.s)}>
                    <h4 className={`font-bold text-sm uppercase tracking-wider ${step === item.s ? 'text-teal-400' : 'text-slate-400'}`}>{item.title}</h4>
                    <p className="text-xs mt-1.5 text-slate-400 leading-relaxed">{item.desc}</p>
                 </div>
              ))}
              
              <button 
                onClick={() => setStep(s => s < 3 ? s + 1 : 1)}
                className="w-full py-4 text-sm bg-white text-black font-bold rounded-xl hover:bg-slate-200 transition-colors mt-4 shadow-lg focus:outline-none focus:ring-4 focus:ring-slate-500/50 uppercase tracking-widest"
              >
                {step < 3 ? 'Next Step →' : 'Restart Demo ↻'}
              </button>
           </div>
        </div>
      </div>
    </section>
  );
}

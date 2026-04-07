"use client";
import { useState } from 'react';

export function ApiDocs() {
  const [tab, setTab] = useState('curl');
  
  const snippets: Record<string, string> = {
    curl: `curl -X POST https://api.mindthecontext.app/chat \\
  -H "Authorization: Bearer cc_live_xxxxxxxxx" \\
  -H "Content-Type: application/json" \\
  -d '{
    "message": "Can you tell me more about that project?",
    "session_id": "usr_9481jfd"
  }'`,
    python: `import requests
    
res = requests.post(
    "https://api.mindthecontext.app/chat",
    headers={"Authorization": "Bearer cc_live_xxxxxxxxx"},
    json={
        "message": "Can you tell me more about that project?",
        "session_id": "usr_9481jfd"
    }
)

print(res.json()["context"]["reconstructed_references"])`,
    javascript: `const res = await fetch("https://api.mindthecontext.app/chat", {
  method: "POST",
  headers: {
    "Authorization": "Bearer cc_live_xxxxxxxxx",
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    message: "Can you tell me more about that project?",
    session_id: "usr_9481jfd"
  })
});

const data = await res.json();
console.log(data.response);`
  };

  return (
    <section id="api" className="pt-2 scroll-mt-24">
      <div className="max-w-4xl mx-auto bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-2xl relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/5 rounded-full blur-3xl -z-10"></div>
        
        <div className="flex border-b border-slate-800">
           {['curl', 'python', 'javascript'].map(t => (
             <button 
               key={t}
               onClick={() => setTab(t)}
               className={`px-8 py-4 text-xs font-bold uppercase tracking-widest transition-colors ${tab === t ? 'text-teal-400 border-b-2 border-teal-400 bg-teal-500/10' : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800/50'}`}
             >
               {t}
             </button>
           ))}
        </div>
        <div className="p-6 md:p-8 bg-[#090A0F]/80">
           <pre className="text-sm font-mono text-slate-300 overflow-x-auto whitespace-pre-wrap leading-relaxed">
             {snippets[tab]}
           </pre>
        </div>
      </div>
    </section>
  );
}

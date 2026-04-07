"use client";
import { useState } from 'react';

export function WaitlistForm() {
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleGenerate = () => {
    // Hash email or just generate a solid random string
    const token = 'cc_live_' + Math.random().toString(36).substring(2, 10) + Math.random().toString(36).substring(2, 10);
    setApiKey(token);
  };

  const handleCopy = () => {
    if (apiKey) {
      navigator.clipboard.writeText(apiKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="max-w-md mx-auto relative group min-h-[80px]">
      {!apiKey ? (
        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-teal-500 to-indigo-500 rounded-xl blur opacity-30 group-hover:opacity-60 transition duration-1000 group-hover:duration-200"></div>
          <button 
            onClick={handleGenerate}
            className="relative w-full bg-slate-900 border border-slate-700 hover:border-teal-500/50 text-white font-bold py-4 px-6 rounded-xl transition-all shadow-2xl flex items-center justify-center gap-2 group-hover:border-teal-500/50"
          >
            <svg className="w-5 h-5 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" /></svg>
            Generate Sandbox API Key
          </button>
        </div>
      ) : (
        <div className="relative rounded-xl p-6 bg-slate-900 border border-teal-500/50 shadow-[0_0_20px_rgba(20,184,166,0.15)] flex flex-col items-center">
           <div className="text-teal-400 font-medium mb-3">Your Sandbox API Key is ready</div>
           <div className="w-full flex items-center justify-between bg-black/50 p-3 rounded-lg border border-slate-800 mb-4 font-mono text-sm overflow-hidden text-slate-300">
             <span className="truncate mr-4">{apiKey}</span>
             <button 
               onClick={handleCopy}
               className={`shrink-0 px-3 py-1.5 rounded-md font-medium text-xs transition-colors ${copied ? 'bg-teal-500/20 text-teal-400 border border-teal-500/30' : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'}`}
             >
               {copied ? 'Copied!' : 'Copy Key'}
             </button>
           </div>
           <p className="text-xs text-slate-500 text-center">Use this token to securely trace memory architecture locally.</p>
        </div>
      )}
    </div>
  );
}

"use client";
import { useState } from 'react';

export function WaitlistForm() {
  const [email, setEmail] = useState('');
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
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
        <>
          <div className="absolute -inset-1 bg-gradient-to-r from-teal-500 to-indigo-500 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
          <form onSubmit={handleGenerate} className="relative flex rounded-xl p-1 bg-slate-900 border border-slate-700 shadow-2xl focus-within:border-teal-500/50 transition-colors">
            <input 
              type="email" 
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Enter your work email" 
              className="bg-transparent flex-1 px-5 py-3 outline-none text-slate-200 placeholder-slate-500"
              required
            />
            <button 
              type="submit" 
              className="bg-teal-600 hover:bg-teal-500 text-white font-bold py-3 px-6 rounded-lg transition-colors whitespace-nowrap shadow-md"
            >
              Get API Key
            </button>
          </form>
        </>
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

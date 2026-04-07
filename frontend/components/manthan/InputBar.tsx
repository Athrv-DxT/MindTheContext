import { useState } from 'react';

export function InputBar({ onSend, isAiThinking }: any) {
  const [val, setVal] = useState("");
  
  const submit = (e: any) => {
    e.preventDefault();
    if (!val.trim() || isAiThinking) return;
    onSend(val);
    setVal("");
  };

  return (
    <form onSubmit={submit} className="p-4 md:p-6 bg-transparent absolute bottom-0 w-full bg-gradient-to-t from-[#0F1117] via-[#0F1117] to-transparent pt-12 pb-6">
      <div className="relative max-w-4xl mx-auto flex items-center shadow-2xl">
        <input 
          type="text" 
          value={val}
          onChange={e => setVal(e.target.value)}
          placeholder="Message Manthan..."
          className="w-full bg-slate-800/90 text-slate-200 placeholder-slate-500 rounded-xl py-4 pl-6 pr-16 focus:outline-none border-2 border-slate-700/50 focus:border-indigo-500/50 shadow-inner disabled:bg-slate-800/50 disabled:cursor-not-allowed backdrop-blur-md transition-all"
          disabled={isAiThinking}
        />
        <button 
          type="submit" 
          disabled={isAiThinking || !val.trim()}
          className="absolute right-2 top-2 bottom-2 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-700 disabled:text-slate-500 text-white p-2 rounded-lg transition-colors flex items-center justify-center font-bold px-4 shadow-sm"
        >
          {isAiThinking ? (
            <div className="flex items-center gap-1">
              <span className="w-1 h-1 bg-white rounded-full animate-bounce" style={{animationDelay: '0ms'}}></span>
              <span className="w-1 h-1 bg-white rounded-full animate-bounce" style={{animationDelay: '150ms'}}></span>
              <span className="w-1 h-1 bg-white rounded-full animate-bounce" style={{animationDelay: '300ms'}}></span>
            </div>
          ) : "↑"}
        </button>
      </div>
    </form>
  );
}

import { ChatMessage } from '@/lib/api';

export function MessageBubble({ msg }: { msg: ChatMessage }) {
  const isUser = msg.role === 'user';
  let dotColor = 'bg-slate-500';
  let score = 0;
  
  if (!isUser && msg.contextData) {
     score = msg.contextData.break_score || 0;
     if (score > 0.65) dotColor = 'bg-[#EF4444] shadow-[0_0_8px_rgba(239,68,68,0.7)]'; 
     else if (score >= 0.30) dotColor = 'bg-[#F59E0B] shadow-[0_0_8px_rgba(245,158,11,0.7)]'; 
     else dotColor = 'bg-[#1D9E75] shadow-[0_0_8px_rgba(29,158,117,0.7)]'; 
  }

  return (
    <div className={`flex w-full mb-6 ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`relative max-w-[85%] md:max-w-[75%] rounded-2xl px-5 py-4 text-[0.95rem] leading-relaxed shadow-sm ${isUser ? 'bg-indigo-600/90 text-white rounded-br-sm' : 'bg-slate-800/80 text-slate-200 rounded-bl-sm border border-slate-700/50'}`}>
        <p className="whitespace-pre-wrap">{msg.content}</p>
        
        {!isUser && msg.telemetry && (
          <div className="group absolute -bottom-1.5 -right-1.5 cursor-help">
            <div className={`w-3.5 h-3.5 rounded-full border-2 border-slate-900 ${dotColor} z-10 relative transition-transform group-hover:scale-125`}></div>
            
            <div className="absolute right-0 bottom-full mb-3 hidden group-hover:block w-52 bg-slate-900 border border-slate-700 rounded-lg shadow-xl p-3 text-xs z-50">
              <div className="text-[10px] uppercase tracking-widest text-slate-500 mb-2 border-b border-slate-800 pb-1">Context Telemetry</div>
              <div className="grid grid-cols-2 gap-y-1.5 gap-x-2 text-slate-300">
                <span>Stall Index:</span><span className="text-right font-mono text-indigo-300">{msg.telemetry.stalling_index.toFixed(2)}</span>
                <span>Ambiguity:</span><span className="text-right font-mono text-indigo-300">{msg.telemetry.reference_ambiguity.toFixed(2)}</span>
                <span>Break Score:</span><span className={`text-right font-mono ${score > 0.65 ? 'text-red-400 font-bold' : 'text-slate-300'}`}>{score.toFixed(2)}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

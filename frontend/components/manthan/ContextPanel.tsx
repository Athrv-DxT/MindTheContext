import { PanelState } from '@/app/manthan/page';

export function ContextPanel({ state, onToggle, onNewChat }: { state: PanelState, onToggle: any, onNewChat: any }) {

  const clarityPercent = Math.round((1 - (state.referenceAmbiguity || 0)) * 100);
  
  const getScoreColor = (val: number, inverse = false) => {
     let isRed = inverse ? val < 0.35 : val > 0.65;
     let isAmber = inverse ? (val >= 0.35 && val <= 0.70) : (val >= 0.30 && val <= 0.65);
     
     if (isRed) return "text-red-400 bg-red-500/10 border border-red-500/20";
     if (isAmber) return "text-amber-400 bg-amber-500/10 border border-amber-500/20";
     return "text-green-400 bg-green-500/10 border border-green-500/20";
  };

  return (
    <div className="flex flex-col h-full w-[300px] p-5 text-[#FAFAFA] bg-[#161618]">
      <div className="flex items-center mb-8 pl-1 pt-1 justify-between">
        <div className="flex items-center gap-2.5">
           <div className="w-7 h-7 rounded-[8px] bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center font-bold text-[11px] text-white shadow-md shadow-indigo-500/20">CC</div>
           <span className="font-semibold text-[15px] tracking-wide text-[#E0E0E5]">MindTheContext</span>
        </div>
        <button className="p-2 hover:bg-white/5 rounded-full transition-colors text-[#A0A0A5] hover:text-white" onClick={onToggle}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-[18px] h-[18px]">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>
      </div>

      <button onClick={onNewChat} className="flex items-center gap-3 bg-[#232326] hover:bg-[#2C2C30] py-3.5 px-4 rounded-xl w-full text-[14px] font-medium transition-all duration-300 mb-8 text-[#E0E0E5] border border-white/[0.03] shadow-sm">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-[18px] h-[18px]">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
        New session
      </button>
      
      <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 space-y-8 pb-4">
        
        {/* Memory Targets / Goal Progress */}
        <div>
          <div className="text-[12px] font-semibold text-[#A8C7FA] mb-2.5 px-1 flex justify-between items-center uppercase tracking-wider">
            <span>Goal progress</span>
            <span className="text-[12.5px] text-[#A8C7FA] font-mono">{state.progress}%</span>
          </div>
          <div className="px-1">
            <div className="w-full bg-[#232326] rounded-full h-1.5 overflow-hidden border border-white/[0.03]">
              <div className="bg-[#A8C7FA] h-full rounded-full transition-all duration-1000 ease-out" style={{ width: `${state.progress}%` }}></div>
            </div>
          </div>
        </div>

        {/* Active Entities */}
        <div>
          <div className="text-[12px] font-semibold text-[#A8C7FA] mb-3 px-1 uppercase tracking-wider">Active Entities</div>
          <div className="flex flex-wrap gap-2 px-1">
            {(!state.entities || state.entities.length === 0) ? (
               <span className="text-[13px] text-[#7A7A80] italic ml-1">No context loaded</span>
            ) : (
               state.entities.map((ent: string, idx: number) => (
                <span key={idx} className="px-3 py-1.5 bg-indigo-500/[0.12] text-indigo-300 border border-indigo-500/20 rounded-full text-[12px] font-medium leading-none tracking-wide animate-fade-in truncate max-w-[240px]">
                  {ent}
                </span>
               ))
            )}
          </div>
        </div>
        
        {/* Context Health */}
        <div>
          <div className="text-[12px] font-semibold text-[#A8C7FA] mb-3 px-1 uppercase tracking-wider">Context Health</div>
          <div className="space-y-2.5 px-1">
             <div className="flex justify-between items-center bg-[#232326] rounded-xl py-3 px-3.5 border border-white/[0.03]">
                <span className="text-[13px] font-medium text-[#D4D4D8]">Stalling index</span>
                <span className={`text-[12px] font-mono font-bold px-2 py-0.5 rounded-md ${getScoreColor(state.stallingIndex)}`}>
                   {state.stallingIndex.toFixed(2)}
                </span>
             </div>
             <div className="flex justify-between items-center bg-[#232326] rounded-xl py-3 px-3.5 border border-white/[0.03]">
                <span className="text-[13px] font-medium text-[#D4D4D8]">Reference clarity</span>
                <span className={`text-[12px] font-mono font-bold px-2 py-0.5 rounded-md border ${clarityPercent >= 85 ? "text-green-400 bg-green-500/10 border-green-500/20" : "text-amber-400 bg-amber-500/10 border-amber-500/20"}`}>
                   {clarityPercent}%
                </span>
             </div>
             <div className="flex justify-between items-center bg-[#232326] rounded-xl py-3 px-3.5 border border-white/[0.03]">
                <span className="text-[13px] font-medium text-[#D4D4D8]">Break score</span>
                <span className={`text-[12px] font-mono font-bold px-2 py-0.5 rounded-md ${getScoreColor(state.breakScore)}`}>
                   {state.breakScore.toFixed(2)}
                </span>
             </div>
          </div>
        </div>

        {/* Break Events */}
        <div>
          <div className="text-[12px] font-semibold text-[#F28B82] mb-3 px-1 flex justify-between items-center uppercase tracking-wider">
             <span>Break Events</span>
             <span className="bg-[#F28B82]/10 text-[#F28B82] border border-[#F28B82]/20 px-2 py-0.5 rounded-md font-mono font-bold text-[11px] leading-tight flex items-center">
               {state.breakCount}
             </span>
          </div>
          <div className="px-1 space-y-2.5">
            {(!state.recentBreaks || state.recentBreaks.length === 0) ? (
               <span className="text-[13px] text-[#7A7A80] italic ml-1">No structural breaks detected.</span>
            ) : (
               state.recentBreaks.slice(-2).map((b, i) => (
                  <div key={i} className="bg-[#1C1C1E] border border-white/[0.05] rounded-xl p-3.5 relative overflow-hidden group shadow-sm transition-all hover:bg-[#232326]">
                     <div className="absolute top-2 right-2 opacity-50 group-hover:opacity-100 transition-opacity">
                        <span className="text-[10px] font-mono font-bold bg-[#F28B82]/20 text-[#F28B82] px-1.5 py-0.5 rounded border border-[#F28B82]/30">{Math.round(b.confidence*100)}%</span>
                     </div>
                     <p className="text-[12px] text-[#A0A0A5] mb-2 line-clamp-1 italic max-w-[85%]">"{b.original}"</p>
                     <div className="flex items-start gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-[14px] h-[14px] text-[#F28B82] mt-0.5 flex-shrink-0"><path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" /></svg>
                        <p className="text-[13.5px] text-[#FAFAFA] font-medium leading-tight">{b.resolved}</p>
                     </div>
                  </div>
               ))
            )}
          </div>
        </div>

      </div>

      <div className="mt-auto pt-4 border-t border-white/[0.05] text-[11px] text-[#7A7A80] flex justify-between items-center px-1 font-mono tracking-wider">
         <span>SESSION: {state.sessionId ? state.sessionId.substring(0, 8) : 'NEW'}</span>
         <span>TURN: {state.turnCount}</span>
      </div>
    </div>
  );
}

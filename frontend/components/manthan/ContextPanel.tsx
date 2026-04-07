export function ContextPanel({ entities, progress, breakCount, onClose }: any) {
  return (
    <div className="flex flex-col h-full bg-slate-900/90 text-slate-300 p-6">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-teal-400 tracking-wider text-sm uppercase">ContextCore</h2>
        <button className="md:hidden text-slate-400 hover:text-white" onClick={onClose}>✕</button>
      </div>
      
      <div className="mb-10">
        <div className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3">Goal Progress</div>
        <div className="w-full bg-slate-800 rounded-full h-1.5 border border-slate-700/50">
          <div className="bg-indigo-500 h-1.5 rounded-full transition-all duration-1000 ease-out shadow-[0_0_8px_rgba(99,102,241,0.6)]" style={{ width: `${progress}%` }}></div>
        </div>
        <div className="text-right text-[10px] mt-2 font-mono text-slate-500">{progress}%</div>
      </div>

      <div className="mb-10 flex-1">
        <div className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3">Active Entities</div>
        <ul className="space-y-2 max-h-[50vh] overflow-y-auto pr-2">
          {entities.length === 0 ? <li className="text-xs text-slate-600 italic">No entities detected yet.</li> : 
           entities.map((ent: string, idx: number) => (
            <li key={idx} className="bg-slate-800/80 px-3 py-2 rounded-lg text-xs font-medium text-slate-300 border border-slate-700/50 shadow-sm">
              <span className="truncate block">{ent}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-auto pt-6 border-t border-slate-800/80">
        <div className="flex justify-between items-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-slate-500">Break Events</span>
          <span className="text-red-400 font-mono text-sm font-bold bg-red-400/10 px-2.5 py-1 rounded-md border border-red-500/20">{breakCount}</span>
        </div>
      </div>
    </div>
  );
}

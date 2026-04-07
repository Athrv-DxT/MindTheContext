import { useEffect, useState } from 'react';

export function BreakAlert({ original, resolved, confidence, onClose }: any) {
  const [visible, setVisible] = useState(false);
  
  useEffect(() => {
    setVisible(true);
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 500); // allow transition out
    }, 8000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`absolute top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ease-out ${visible ? 'translate-y-0 opacity-100 scale-100' : '-translate-y-16 opacity-0 scale-95'}`}>
      <div className="bg-red-500/90 text-white px-6 py-4 rounded-xl shadow-[0_8px_30px_rgba(239,68,68,0.3)] border border-red-400/50 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 backdrop-blur-md min-w-[320px]">
        <div>
          <div className="text-[10px] font-bold uppercase tracking-widest text-red-200 mb-1 flex items-center gap-2">
            <span className="animate-pulse">⚠️</span> Context Break Prevented
          </div>
          <div className="text-sm font-medium my-1.5 flex items-center flex-wrap gap-2">
            <span className="line-through opacity-70 bg-black/20 px-1.5 rounded">"{original}"</span>
            <span className="mx-1 text-red-200">→</span>
            <span className="font-bold bg-white/20 px-1.5 rounded">"{resolved}"</span>
          </div>
          <div className="text-[10px] mt-2 opacity-80 uppercase tracking-widest flex items-center gap-2">
            Reconstruction Match 
            <span className="font-bold font-mono text-red-100 bg-red-900/50 px-1.5 py-0.5 rounded">
              {(confidence * 100).toFixed(0)}%
            </span>
          </div>
        </div>
        <button onClick={() => { setVisible(false); setTimeout(onClose, 500); }} className="text-white/70 hover:text-white p-1 text-lg rounded-full hover:bg-black/10 transition-colors ml-auto md:ml-0 h-8 w-8 flex items-center justify-center">
          ✕
        </button>
      </div>
    </div>
  );
}

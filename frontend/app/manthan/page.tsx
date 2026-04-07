"use client";
import { useState } from 'react';
import { ContextPanel } from '@/components/manthan/ContextPanel';
import { ChatWindow } from '@/components/manthan/ChatWindow';

export default function ManthanChat() {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [entities, setEntities] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [breakCount, setBreakCount] = useState(0);

  return (
    <div className="flex h-screen bg-[#0F1117] text-slate-200 overflow-hidden relative">
      {/* Mobile toggle */}
      <button 
        onClick={() => setIsPanelOpen(true)} 
        className="md:hidden absolute top-4 left-4 z-50 p-2 text-sm bg-slate-800 hover:bg-slate-700 transition-colors rounded shadow-lg text-white"
      >
        Menu
      </button>
      
      {/* Context Panel */}
      <div 
        className={`fixed inset-y-0 left-0 w-[250px] bg-slate-900 border-r border-slate-800/80 transform ${isPanelOpen ? 'translate-x-0 cursor-auto' : '-translate-x-full cursor-pointer'} md:relative md:translate-x-0 transition-transform z-40`}
      >
        <ContextPanel 
          entities={entities} 
          progress={progress} 
          breakCount={breakCount} 
          onClose={() => setIsPanelOpen(false)} 
        />
      </div>

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col h-full overflow-hidden">
         <ChatWindow 
           onStateUpdate={(newEntities, newProgress, hasBreak) => {
             setEntities(newEntities);
             setProgress(newProgress);
             if (hasBreak) setBreakCount(prev => prev + 1);
           }}
         />
      </main>
    </div>
  );
}

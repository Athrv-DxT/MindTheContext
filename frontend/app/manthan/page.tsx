"use client";
import { useState } from 'react';
import Link from 'next/link';
import { ContextPanel } from '@/components/manthan/ContextPanel';
import { ChatWindow } from '@/components/manthan/ChatWindow';

export interface PanelState {
  entities: string[];
  progress: number;
  stallingIndex: number;
  referenceAmbiguity: number;
  breakScore: number;
  breakCount: number;
  recentBreaks: Array<{ original: string, resolved: string, confidence: number }>;
  turnCount: number;
  sessionId: string;
}

export default function ManthanChat() {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [resetKey, setResetKey] = useState(0);
  
  const [panelState, setPanelState] = useState<PanelState>({
    entities: [],
    progress: 0,
    stallingIndex: 0,
    referenceAmbiguity: 0,
    breakScore: 0,
    breakCount: 0,
    recentBreaks: [],
    turnCount: 0,
    sessionId: ''
  });

  const handleNewChat = () => {
    setPanelState({
      entities: [], progress: 0, stallingIndex: 0, referenceAmbiguity: 0, 
      breakScore: 0, breakCount: 0, recentBreaks: [], turnCount: 0, sessionId: ''
    });
    setResetKey(prev => prev + 1);
  };

  return (
    <div className="flex h-screen bg-[#0E0E10] text-[#FAFAFA] overflow-hidden font-sans selection:bg-indigo-500/30">
      
      {/* Sidebar Overlay for Mobile / Slide for Desktop */}
      <div 
        className={`${isPanelOpen ? 'w-[300px] border-r border-[#222224]' : 'w-0 border-r-0 border-transparent'} flex-shrink-0 transition-all duration-500 ease-[cubic-bezier(0.2,1,0.2,1)] overflow-hidden bg-[#161618] z-40 relative shadow-2xl`}
      >
        <div className="w-[300px] h-full flex flex-col">
           <ContextPanel 
             state={panelState}
             onToggle={() => setIsPanelOpen(false)} 
             onNewChat={handleNewChat}
           />
        </div>
      </div>

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col h-full bg-[#0E0E10] overflow-hidden relative">
        {/* Sleek Hamburger Menu & Home */}
        {!isPanelOpen && (
          <div className="absolute top-5 left-5 z-50 flex items-center gap-4">
            <button 
              onClick={() => setIsPanelOpen(true)} 
              className="p-2.5 text-[#A0A0A5] hover:bg-white/5 hover:text-white rounded-full transition-all duration-300 group"
            >
              <div className="flex flex-col gap-1.5 w-5 items-start justify-center">
                 <span className="w-5 h-[2px] bg-current rounded-full transition-all duration-300 group-hover:w-5"></span>
                 <span className="w-3.5 h-[2px] bg-current rounded-full transition-all duration-300 group-hover:w-5"></span>
                 <span className="w-5 h-[2px] bg-current rounded-full transition-all duration-300 group-hover:w-5"></span>
              </div>
            </button>
            <Link href="/" className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white text-sm font-medium hover:bg-white/10 hover:border-white/20 transition-all backdrop-blur-md shadow-sm">
              Home
            </Link>
          </div>
        )}
        
        <ChatWindow 
          key={resetKey}
          onStateUpdate={(update) => {
            setPanelState(prev => {
               const combinedEntities = Array.from(new Set([...prev.entities, ...(update.entities || [])]));
               
               return {
                 ...prev,
                 ...update,
                 entities: combinedEntities,
                 breakCount: prev.breakCount + (update.breakCount || 0)
               };
            });
          }}
        />
      </main>
      
      {/* Dark tint overlay when sidebar open on small screens */}
      {isPanelOpen && (
         <div 
           className="md:hidden fixed inset-0 bg-black/60 z-30 backdrop-blur-sm transition-opacity" 
           onClick={() => setIsPanelOpen(false)}
         />
      )}
    </div>
  );
}

import { useState, useRef, useEffect } from 'react';
import { InputBar } from './InputBar';
import { BreakAlert } from './BreakAlert';
import { ChatMessage, sendChatMessage } from '@/lib/api';

import { PanelState } from '@/app/manthan/page';

export function ChatWindow({ onStateUpdate }: { onStateUpdate: (stateUpdate: Partial<PanelState>) => void }) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [isAiThinking, setIsAiThinking] = useState(false);
  const [currentBreak, setCurrentBreak] = useState<any>(null);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isAiThinking]);

  const handleSend = async (text: string) => {
    const newMsg: ChatMessage = { id: Date.now().toString(), role: 'user', content: text };
    setMessages(prev => [...prev, newMsg]);
    setIsAiThinking(true);
    
    try {
      const result = await sendChatMessage(text, sessionId, messages);
      setSessionId(result.session_id);
      
      const assistantMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: result.response,
        telemetry: result.telemetry,
        contextData: result.context
      };
      
      setMessages(prev => [...prev, assistantMsg]);
      
      if (result.context.break_detected && result.context.reconstructed_references?.length > 0) {
        setCurrentBreak(result.context.reconstructed_references[0]);
      }
      
      const c = result.context;
      const t = result.telemetry;
      const turns = (messages.length + 2) / 2;
      
      onStateUpdate({
         entities: Array.from(new Set(c.active_entities || [])),
         progress: t.progress_estimate || 0,
         stallingIndex: t.stalling_index || 0,
         referenceAmbiguity: t.reference_ambiguity || 0,
         breakScore: c.break_score || 0,
         breakCount: c.break_detected ? 1 : 0, // This is handled gracefully in root via accumulators if needed, wait I should pass raw boolean 
         recentBreaks: c.reconstructed_references || [],
         turnCount: turns,
         sessionId: result.session_id
      });
      
    } catch (e) {
      console.error(e);
      setMessages(prev => [...prev, { id: 'error', role: 'assistant', content: 'Connection to memory failed.' }]);
    } finally {
      setIsAiThinking(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col relative w-full h-full bg-[#0E0E10] text-[#FAFAFA]">
      {currentBreak && (
         <BreakAlert 
           original={currentBreak.original} 
           resolved={currentBreak.resolved} 
           confidence={currentBreak.confidence}
           onClose={() => setCurrentBreak(null)}
         />
      )}

      {messages.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center p-6 min-h-screen">
           <div className="w-full max-w-[800px] mb-12 transform -translate-y-4">
              <h1 className="text-[48px] md:text-[60px] font-semibold leading-[1.1] tracking-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 opacity-90">Hello</span><br/>
                <span className="text-[#6E6E73]">Where should we start?</span>
              </h1>
           </div>
           
           <InputBar onSend={handleSend} isAiThinking={isAiThinking} />
        </div>
      ) : (
        <div className="flex-1 flex flex-col overflow-hidden">
           <div className="flex-1 overflow-y-auto px-4 custom-scrollbar scroll-smooth">
             <div className="max-w-[800px] mx-auto min-h-full flex flex-col pt-12 pb-6">
               {messages.map(m => (
                 <div key={m.id} className="flex gap-5 w-full mb-8 group">
                    {/* User messages */}
                    {m.role === 'user' ? (
                       <div className="ml-auto bg-[#232326] px-5 py-3.5 rounded-3xl rounded-tr-sm max-w-[85%] text-[15px] text-[#E0E0E5] leading-relaxed shadow-sm">
                          {m.content}
                       </div>
                    ) : (
                       /* AI messages */
                       <div className="w-full flex gap-5 pr-8">
                          <div className="mt-0.5 w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500/20 to-purple-500/20 shadow-[0_0_15px_rgba(99,102,241,0.1)] border border-indigo-500/30 flex items-center justify-center flex-shrink-0 relative overflow-hidden">
                             <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer"></div>
                             <span className="text-[12px]">✨</span>
                          </div>
                          <div className="flex-1 text-[#E0E0E5] text-[15px] leading-relaxed pt-1.5 flex flex-col gap-2 relative">
                             {m.content}
                             
                             {m.telemetry && m.contextData && (
                               <div className="group/dot absolute -left-[52px] top-11 cursor-help flex items-center justify-center w-6 h-6">
                                  <div className={`w-2 h-2 rounded-full ${m.contextData.break_score > 0.65 ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]' : 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]'} opacity-0 group-hover:opacity-100 transition-all duration-500 scale-75 group-hover/dot:scale-110`}></div>
                               </div>
                             )}
                          </div>
                       </div>
                    )}
                 </div>
               ))}
               
               {isAiThinking && (
                 <div className="flex w-full gap-5 mb-8">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="w-2.5 h-2.5 bg-indigo-400 rounded-full animate-ping opacity-75"></span>
                    </div>
                 </div>
               )}
               <div ref={endRef} className="h-4" />
             </div>
           </div>
           
           <div className="w-full shrink-0 pb-6 pt-2 bg-gradient-to-t from-[#0E0E10] via-[#0E0E10] to-transparent">
             <InputBar onSend={handleSend} isAiThinking={isAiThinking} />
             <div className="text-center text-[12px] font-medium text-[#7A7A80] mt-4 tracking-wide max-w-[650px] mx-auto leading-relaxed">
                This is not a general-purpose AI. Manthan is specifically architected to demonstrate the <span className="text-indigo-400/90 font-semibold">MindTheContext</span> pipeline. Open the sidebar during interactions to monitor real-time graph mapping and entity retention across your conversation.
             </div>
           </div>
        </div>
      )}
    </div>
  );
}

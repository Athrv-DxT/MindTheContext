import { useState, useRef, useEffect } from 'react';
import { MessageBubble } from './MessageBubble';
import { InputBar } from './InputBar';
import { BreakAlert } from './BreakAlert';
import { ChatMessage, sendChatMessage } from '@/lib/api';

export function ChatWindow({ onStateUpdate }: { onStateUpdate: (entities: string[], progress: number, breakDetected: boolean) => void }) {
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
      const result = await sendChatMessage(text, sessionId);
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
      
      onStateUpdate(
        result.context.active_entities, 
        result.context.goal_progress, 
        result.context.break_detected
      );
      
    } catch (e) {
      console.error(e);
      setMessages(prev => [...prev, { id: 'error', role: 'assistant', content: 'We experienced a memory sub-system crash. Let me retry establishing context.' }]);
    } finally {
      setIsAiThinking(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col relative w-full h-full bg-[#0F1117]">
      {currentBreak && (
         <BreakAlert 
           original={currentBreak.original} 
           resolved={currentBreak.resolved} 
           confidence={currentBreak.confidence}
           onClose={() => setCurrentBreak(null)}
         />
      )}
      
      <div className="flex-1 overflow-y-auto px-4 md:px-8 custom-scrollbar">
        <div className="max-w-4xl mx-auto pb-48 mt-16 md:mt-8">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-[60vh] text-slate-500">
              <div className="w-20 h-20 mb-6 rounded-3xl bg-gradient-to-br from-indigo-500/20 to-teal-500/10 border border-indigo-500/20 flex items-center justify-center shadow-[0_0_30px_rgba(99,102,241,0.1)]">
                <span className="text-3xl bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-teal-400 font-extrabold">CC</span>
              </div>
              <h3 className="text-2xl font-bold text-slate-300">How can I help you today?</h3>
              <p className="mt-3 text-sm text-slate-400">Ask about a project, a person, or just start chatting.</p>
            </div>
          ) : (
            messages.map(m => <MessageBubble key={m.id} msg={m} />)
          )}
          
          {isAiThinking && (
             <div className="flex justify-start mb-6">
                <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl rounded-bl-sm p-5 flex items-center gap-2 shadow-sm">
                   <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></div>
                   <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse delay-75"></div>
                   <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse delay-150"></div>
                </div>
             </div>
          )}
          <div ref={endRef} />
        </div>
      </div>
      
      <div className="absolute top-4 right-4 md:top-8 md:right-8 z-20">
        <button 
          onClick={() => { setMessages([]); setSessionId(null); setCurrentBreak(null); onStateUpdate([], 0, false); }} 
          className="text-xs bg-slate-800 hover:bg-slate-700 hover:border-slate-600 text-slate-300 px-4 py-2 rounded-lg border border-slate-700 shadow-lg flex items-center gap-2 transition-all group"
        >
          <span className="text-indigo-400 group-hover:rotate-180 transition-transform duration-500">↻</span> New Session
        </button>
      </div>

      <InputBar onSend={handleSend} isAiThinking={isAiThinking} />
    </div>
  );
}

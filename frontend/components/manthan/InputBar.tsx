import { useState, useRef, useEffect } from 'react';

export function InputBar({ onSend, isAiThinking }: any) {
  const [val, setVal] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [val]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      submit(e);
    }
  };
  
  const submit = (e: any) => {
    if(e && e.preventDefault) e.preventDefault();
    if (!val.trim() || isAiThinking) return;
    onSend(val);
    setVal("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";
  };

  return (
    <div className="w-full flex flex-col items-center justify-center px-4 md:px-6">
      {/* Sleek Input Container */}
      <div className="w-full max-w-[800px] relative bg-[#1C1C1E]/80 backdrop-blur-2xl rounded-[32px] px-3 py-3 flex items-end transition-all duration-300 border border-white/[0.04] shadow-[0_4px_24px_rgba(0,0,0,0.2)] focus-within:bg-[#232326] focus-within:border-white/[0.08] focus-within:shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
        
        <textarea 
          ref={textareaRef}
          value={val}
          onChange={e => setVal(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask Manthan"
          className="flex-1 bg-transparent text-[#F2F2F2] placeholder-[#7A7A80] px-3 md:px-4 pb-1 pt-2 focus:outline-none resize-none max-h-[200px] custom-scrollbar text-[16px] leading-[1.6]"
          disabled={isAiThinking}
          rows={1}
        />
        
        <div className="flex-shrink-0 ml-2 mb-0.5 mr-1">
            {val.trim().length > 0 ? (
               <button 
                onClick={submit}
                disabled={isAiThinking}
                className="p-2 bg-gradient-to-tr from-indigo-500 to-purple-500 text-white hover:from-indigo-400 hover:to-purple-400 disabled:opacity-50 disabled:grayscale rounded-full transition-all duration-300 w-[36px] h-[36px] flex items-center justify-center shadow-lg shadow-indigo-500/20"
               >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 ml-0.5"><path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" /></svg>
               </button>
            ) : (
               <div className="w-[36px] h-[36px]"></div>
            )}
        </div>
      </div>
    </div>
  );
}

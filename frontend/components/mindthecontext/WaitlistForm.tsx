"use client";

export function WaitlistForm() {
  return (
    <div className="max-w-md mx-auto relative group">
      <div className="absolute -inset-1 bg-gradient-to-r from-teal-500 to-indigo-500 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
      <form onSubmit={e => e.preventDefault()} className="relative flex rounded-xl p-1 bg-slate-900 border border-slate-700 shadow-2xl focus-within:border-teal-500/50 transition-colors">
        <input 
          type="email" 
          placeholder="Enter your work email" 
          className="bg-transparent flex-1 px-5 py-3 outline-none text-slate-200 placeholder-slate-500"
          required
        />
        <button 
          type="submit" 
          className="bg-teal-600 hover:bg-teal-500 text-white font-bold py-3 px-6 rounded-lg transition-colors whitespace-nowrap shadow-md"
        >
          Get API Key
        </button>
      </form>
      <p className="text-xs text-slate-500 mt-6 font-medium tracking-wide">Join 2,000+ developers on the waitlist.</p>
    </div>
  );
}

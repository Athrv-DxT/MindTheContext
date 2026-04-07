import { WaitlistForm } from './WaitlistForm';

export function PitchSection() {
  return (
    <section id="hero" className="text-center max-w-4xl mx-auto pt-10 scroll-mt-32">
      <div className="inline-block px-4 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-bold tracking-widest uppercase mb-8 shadow-[0_0_15px_rgba(20,184,166,0.2)]">
        API For Developers
      </div>
      <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight text-white leading-tight">
        The memory layer <br className="hidden md:block" /> your AI product is missing.
      </h1>
      <p className="text-xl text-slate-400 mb-10 leading-relaxed max-w-2xl mx-auto">
        Most AI products forget context after 15–30 turns. MindTheContext plugs into your existing stack — tracking entities, detecting breaks, and reconstructing references automatically.
      </p>
      
      <div className="flex justify-center items-center gap-4 md:gap-8 text-xs md:text-sm text-slate-500 uppercase tracking-widest font-semibold mb-16 flex-wrap">
        <span>Support Bots</span>
        <span className="w-1.5 h-1.5 rounded-full bg-slate-700"></span>
        <span>AI Therapy Apps</span>
        <span className="w-1.5 h-1.5 rounded-full bg-slate-700"></span>
        <span>Interview Platforms</span>
      </div>
      
      <WaitlistForm />
    </section>
  );
}

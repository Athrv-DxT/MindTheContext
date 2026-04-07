import { PitchSection } from '@/components/mindthecontext/PitchSection';
import { LiveDemo } from '@/components/mindthecontext/LiveDemo';
import { ApiDocs } from '@/components/mindthecontext/ApiDocs';
import { ArchitectureFlow } from '@/components/mindthecontext/ArchitectureFlow';
import Link from 'next/link';

export default function MindTheContext() {
  return (
    <main className="min-h-screen bg-[#0F1117] text-slate-200 overflow-x-hidden selection:bg-teal-500/30 relative scroll-smooth">
      {/* Floating Glassmorphism Nav */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-6 px-6 py-3 rounded-full bg-slate-900/40 border border-white/10 backdrop-blur-xl shadow-[0_0_30px_rgba(0,0,0,0.5)] whitespace-nowrap">
         <Link href="/" className="text-white hover:text-teal-400 font-bold text-sm tracking-wide transition-colors flex items-center pr-6 border-r border-white/10">
           <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
           Home
         </Link>
         <div className="flex items-center gap-4 md:gap-8 text-sm font-medium text-slate-300">
           <a href="#hero" className="hover:text-teal-400 transition-colors">Start</a>
           <a href="#architecture" className="hover:text-teal-400 transition-colors hidden sm:block">Architecture</a>
           <a href="#demo" className="hover:text-teal-400 transition-colors">Demo</a>
           <a href="#api" className="hover:text-teal-400 transition-colors">Docs</a>
         </div>
      </nav>

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-teal-900/10 via-[#0F1117] to-[#0F1117] -z-10"></div>
      <div className="max-w-6xl mx-auto px-6 py-16 md:py-24 space-y-40 mt-12">
        <PitchSection />
        <ArchitectureFlow />
        <LiveDemo />
        <ApiDocs />
      </div>
    </main>
  );
}

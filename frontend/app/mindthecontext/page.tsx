import { PitchSection } from '@/components/mindthecontext/PitchSection';
import { LiveDemo } from '@/components/mindthecontext/LiveDemo';
import { ApiDocs } from '@/components/mindthecontext/ApiDocs';

export default function MindTheContext() {
  return (
    <main className="min-h-screen bg-[#0F1117] text-slate-200 overflow-x-hidden selection:bg-teal-500/30">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-teal-900/10 via-[#0F1117] to-[#0F1117] -z-10"></div>
      <div className="max-w-6xl mx-auto px-6 py-16 md:py-24 space-y-40">
        <PitchSection />
        <LiveDemo />
        <ApiDocs />
      </div>
    </main>
  );
}

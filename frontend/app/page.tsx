import { ProductCard } from '@/components/landing/ProductCard';
import Link from 'next/link';

export default function Landing() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-[#0E0E10] relative overflow-hidden font-sans selection:bg-indigo-500/30">
      {/* Background Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-indigo-600/20 blur-[100px] mix-blend-screen pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-teal-600/10 blur-[120px] mix-blend-screen pointer-events-none" />
      
      <div className="max-w-6xl w-full relative z-10 p-10 md:p-14 rounded-[2rem] border border-white/5 backdrop-blur-xl shadow-2xl bg-black/40">
        <div className="flex flex-col items-center justify-center gap-4 mb-20">
          <div className="px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-sm font-medium tracking-wide shadow-[0_0_15px_rgba(99,102,241,0.2)] mb-4">
            Next Generation Autonomous Memory
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-white to-teal-300 text-center tracking-tight leading-tight drop-shadow-lg">
            MindTheContext
          </h1>
          <p className="text-[#A0A0A5] text-center text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mt-4">
            The intelligent temporal mapping API capable of resolving complex anaphora, monitoring health metrics, and preserving conversation entities seamlessly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 w-full max-w-5xl mx-auto">
          <ProductCard 
            title="Manthan AI"
            description="Experience a live conversational interface utilizing native Graph Memory."
            features={["Active entity extraction", "Pronoun anaphora resolution", "Zero-latency graph retention"]}
            cta="Enter Manthan →"
            href="/manthan"
            accent="indigo"
          />
          <ProductCard 
            title="Engine Architecture"
            description="Explore the universal POST /chat deployment API capabilities natively."
            features={["Structural telemetry scores", "Temporal knowledge extraction", "Fracture isolation logic"]}
            cta="Explore API →"
            href="/mindthecontext"
            accent="teal"
          />
        </div>
      </div>
    </main>
  );
}

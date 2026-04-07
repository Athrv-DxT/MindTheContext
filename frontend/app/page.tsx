"use client";
import { useState, useEffect } from 'react';
import { ProductCard } from '@/components/landing/ProductCard';

export default function Landing() {
  const [loading, setLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Reveal content elegantly after a brief 1.2s timeout
    const showTimer = setTimeout(() => setShowContent(true), 1200);
    // Unmount loader entirely after transition finishes
    const hideTimer = setTimeout(() => setLoading(false), 2000);
    return () => { clearTimeout(showTimer); clearTimeout(hideTimer); };
  }, []);

  return (
    <>
      {loading && (
        <div className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#020204] transition-opacity duration-700 pointer-events-none ${showContent ? 'opacity-0' : 'opacity-100'}`}>
          <div className="relative flex items-center justify-center mb-8">
            <div className="absolute w-16 h-16 rounded-full border border-teal-500/10 border-t-teal-400 border-r-teal-400 animate-spin"></div>
            <div className="absolute w-10 h-10 rounded-full border border-indigo-500/10 border-b-indigo-400 border-l-indigo-400 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.2s' }}></div>
            <div className="w-2 h-2 bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.8)] animate-pulse"></div>
          </div>
          <div className="text-[10px] text-teal-400/60 uppercase tracking-[0.4em] font-medium animate-pulse">Initializing Memory Layer</div>
        </div>
      )}

      <div className={`transition-all duration-1000 ${showContent ? 'opacity-100 blur-none' : 'opacity-0 blur-lg h-screen overflow-hidden'}`}>
        <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-[#020204] relative overflow-hidden font-sans selection:bg-teal-500/30">
          
          {/* Animated Deep Space Blueprint Grid */}
          <div className="absolute inset-0 z-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_80%)] animate-[pulse_10s_ease-in-out_infinite]" />

          {/* Floating Ambient Nexus Orbs */}
          <div className="absolute top-[10%] left-[10%] w-[500px] h-[500px] rounded-full bg-indigo-600/20 blur-[130px] mix-blend-screen pointer-events-none animate-[pulse_6s_ease-in-out_infinite]" />
          <div className="absolute bottom-[10%] right-[10%] w-[600px] h-[600px] rounded-full bg-teal-500/10 blur-[150px] mix-blend-screen pointer-events-none animate-[pulse_8s_ease-in-out_infinite_1s]" />
          <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-purple-900/10 blur-[150px] mix-blend-screen pointer-events-none animate-[pulse_12s_ease-in-out_infinite_2s]" />

          <div className="max-w-6xl w-full relative z-10 p-10 md:p-14 rounded-[2.5rem] border border-white/5 backdrop-blur-3xl shadow-[0_0_80px_rgba(0,0,0,0.8)] bg-slate-950/50 ring-1 ring-white/10 group hover:ring-white/20 transition-all duration-1000">
            
            {/* Decorative corner accents */}
            <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-teal-500/30 rounded-tl-[2.5rem] pointer-events-none transition-all duration-700 group-hover:border-teal-400"></div>
            <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-indigo-500/30 rounded-br-[2.5rem] pointer-events-none transition-all duration-700 group-hover:border-indigo-400"></div>

            <div className="flex flex-col items-center justify-center gap-4 mb-20 relative mt-6">
              
              {/* Glowing Telemetry Badge */}
              <div className="relative px-6 py-2 rounded-full border border-teal-500/30 bg-teal-500/10 text-teal-300 text-xs md:text-sm font-bold tracking-[0.2em] uppercase shadow-[0_0_20px_rgba(20,184,166,0.15)] mb-6 transition-all duration-500 hover:shadow-[0_0_30px_rgba(20,184,166,0.4)] cursor-default overflow-hidden group-hover:border-teal-500/60">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-[150%] animate-[shimmer_3s_infinite]"></div>
                <div className="flex items-center gap-3">
                   <div className="relative flex items-center justify-center w-2 h-2">
                     <span className="absolute w-2 h-2 rounded-full bg-teal-400 animate-ping opacity-75"></span>
                     <span className="relative w-1.5 h-1.5 rounded-full bg-teal-500"></span>
                   </div>
                   Live Memory Architecture
                </div>
              </div>

              {/* Shimmering Epic Title */}
              <h1 className="text-6xl md:text-[5.5rem] font-black text-transparent bg-clip-text bg-gradient-to-br from-white via-slate-200 to-indigo-400 text-center tracking-tighter leading-[1.1] drop-shadow-[0_0_40px_rgba(255,255,255,0.05)] hover:drop-shadow-[0_0_60px_rgba(99,102,241,0.2)] transition-all duration-700">
                MindThe<span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-300">Context</span>
              </h1>

              <p className="text-slate-400 text-center text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mt-8 font-medium">
                The intelligent temporal mapping API capable of resolving complex anaphora, monitoring health metrics, and preserving conversation entities <span className="text-white font-semibold">seamlessly.</span>
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 w-full max-w-5xl mx-auto pb-4">
              <div className="transform hover:-translate-y-2 transition-all duration-500 shadow-2xl hover:shadow-[0_20px_50px_rgba(99,102,241,0.15)] rounded-3xl">
                 <ProductCard 
                   title="Manthan AI"
                   description="Experience a live conversational interface utilizing native Graph Memory."
                   features={["Active entity extraction", "Pronoun anaphora resolution", "Zero-latency graph retention"]}
                   cta="Enter Manthan →"
                   href="/manthan"
                   accent="indigo"
                 />
              </div>
              <div className="transform hover:-translate-y-2 transition-all duration-500 delay-75 shadow-2xl hover:shadow-[0_20px_50px_rgba(20,184,166,0.15)] rounded-3xl">
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
          </div>
        </main>
      </div>
    </>
  );
}

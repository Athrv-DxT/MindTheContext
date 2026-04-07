import { ProductCard } from '@/components/landing/ProductCard';

export default function Landing() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-[#0F1117]">
      <div className="max-w-5xl w-full">
        <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-teal-400 text-center mb-4">
          ContextCore
        </h1>
        <p className="text-slate-400 text-center mb-16 text-lg max-w-2xl mx-auto">
          The autonomous memory kernel for next-generation conversational interfaces.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ProductCard 
            title="Manthan AI"
            description="A conversational AI that never loses the thread."
            features={["Active context memory", "Break detection", "Reference reconstruction"]}
            cta="Start chatting →"
            href="/manthan"
            accent="indigo"
          />
          <ProductCard 
            title="MindTheContext"
            description="Plug-in memory API for any AI product."
            features={["Zero-drift guarantee", "Break audit logs", "POST /chat → coherent memory"]}
            cta="See the API →"
            href="/mindthecontext"
            accent="teal"
          />
        </div>
      </div>
    </main>
  );
}

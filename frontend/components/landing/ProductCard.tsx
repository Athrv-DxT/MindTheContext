import Link from 'next/link';

interface Props {
  title: string;
  description: string;
  features: string[];
  cta: string;
  href: string;
  accent: string;
}

export function ProductCard({ title, description, features, cta, href, accent }: Props) {
  const accentText = accent === 'indigo' ? 'text-indigo-400' : 'text-teal-400';
  const hoverBg = accent === 'indigo' ? 'hover:bg-indigo-600' : 'hover:bg-teal-600';
  const ctaColor = accent === 'indigo' ? 'bg-indigo-500' : 'bg-teal-500';

  return (
    <div className={`p-8 rounded-xl border border-slate-800 bg-slate-900/50 hover:border-slate-700 transition-colors flex flex-col justify-between`}>
      <div>
        <h2 className={`text-2xl font-bold mb-3 ${accentText}`}>{title}</h2>
        <p className="text-slate-400 mb-6">{description}</p>
        <ul className="space-y-3 mb-8">
          {features.map((f, i) => (
            <li key={i} className="flex items-center text-sm font-medium text-slate-300">
              <span className={`w-1.5 h-1.5 rounded-full mr-3 ${ctaColor}`}></span>
              {f}
            </li>
          ))}
        </ul>
      </div>
      <Link href={href} className={`block w-full py-3 text-center rounded-lg font-semibold text-white ${ctaColor} ${hoverBg} transition-colors`}>
        {cta}
      </Link>
    </div>
  );
}

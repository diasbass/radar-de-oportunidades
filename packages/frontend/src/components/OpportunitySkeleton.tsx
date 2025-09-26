// src/components/OpportunitySkeleton.tsx

export function OpportunitySkeleton() {
  return (
    <div className="bg-slate-800 rounded-lg p-4 border border-slate-700 flex justify-between items-center animate-pulse">
      {/* O animate-pulse do Tailwind faz a mágica da animação */}
      <div>
        <div className="h-5 w-32 bg-slate-700 rounded mb-2"></div>
        <div className="h-4 w-16 bg-slate-700 rounded"></div>
      </div>
      <div className="text-right">
        <div className="h-6 w-12 bg-slate-700 rounded mb-1"></div>
        <div className="h-3 w-24 bg-slate-700 rounded"></div>
      </div>
    </div>
  );
}
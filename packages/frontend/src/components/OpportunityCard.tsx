// Definimos o "formato" dos dados que este componente espera receber
interface Opportunity {
  id: string;
  project: string;
  chain: string;
  symbol: string;
  apy: number;
  tvl: number;
}

interface OpportunityCardProps {
  opportunity: Opportunity;
}

// Intl.NumberFormat é um jeito moderno de formatar números
const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

export function OpportunityCard({ opportunity }: OpportunityCardProps) {
  return (
    <div className="bg-slate-800 rounded-lg p-4 border border-slate-700 flex justify-between items-center hover:border-cyan-400 transition-colors">
      <div>
        <p className="text-lg font-bold">{opportunity.project}</p>
        <p className="text-sm text-slate-400">{opportunity.symbol}</p>
      </div>
      <div className="text-right">
        <p className="text-xl font-bold text-green-400">{opportunity.apy}%</p>
        <p className="text-xs text-slate-400">
          Liquidez: {currencyFormatter.format(opportunity.tvl)}
        </p>
      </div>
    </div>
  );
}
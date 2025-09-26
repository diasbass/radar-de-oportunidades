// packages/frontend/src/components/OpportunityList.tsx
import { useState, useMemo } from 'react'; // Importa useMemo
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { OpportunityCard } from './OpportunityCard';
import { OpportunitySkeleton } from './OpportunitySkeleton'; // Importa o Skeleton

interface Opportunity {
  id: string;
  project: string;
  chain: string;
  symbol: string;
  apy: number;
  tvl: number;
}

const CHAINS = ['Polygon', 'Arbitrum', 'Optimism'];
const SORT_OPTIONS = {
  apy: 'Maior APY',
  tvl: 'Maior Liquidez',
};
const MIN_TVL_OPTIONS = {
  '10000': '> $10k',
  '100000': '> $100k',
  '1000000': '> $1M',
}

async function fetchOpportunities(): Promise<Opportunity[]> {
  const { data } = await axios.get('/api/opportunities');
  return data;
}

export function OpportunityList() {
  const [selectedChain, setSelectedChain] = useState(CHAINS[0]);
  // Novos estados para ordenação e filtro de TVL
  const [sortBy, setSortBy] = useState<'apy' | 'tvl'>('apy');
  const [minTvl, setMinTvl] = useState(10000);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['opportunities'],
    queryFn: fetchOpportunities,
  });

  // Usamos useMemo para recalcular a lista apenas quando os dados ou filtros mudarem
  const processedData = useMemo(() => {
    if (!data) return [];
    return data
      .filter(op => op.chain === selectedChain && op.tvl >= minTvl)
      .sort((a, b) => {
        if (sortBy === 'tvl') {
          return b.tvl - a.tvl;
        }
        return b.apy - a.apy; // Padrão é ordenar por APY
      });
  }, [data, selectedChain, minTvl, sortBy]);

  // --- AQUI USAMOS O SKELETON ---
  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <OpportunitySkeleton key={i} />
        ))}
      </div>
    );
  }

  if (isError) {
    return <p className="text-center text-red-500">Falha ao buscar oportunidades.</p>;
  }

  return (
    <div className="space-y-6">
      {/* Painel de Controles */}
      <div className="bg-slate-800 p-3 rounded-lg border border-slate-700 space-y-4">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-slate-400">Rede:</span>
          {CHAINS.map(chain => (
            <button
              key={chain}
              onClick={() => setSelectedChain(chain)}
              className={`px-3 py-1 text-sm rounded-full transition-colors ${
                selectedChain === chain ? 'bg-cyan-500 text-slate-900 font-bold' : 'bg-slate-700 hover:bg-slate-600'
              }`}
            >
              {chain}
            </button>
          ))}
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-slate-400">Ordenar por:</label>
            <select onChange={(e) => setSortBy(e.target.value as 'apy' | 'tvl')} value={sortBy} className="bg-slate-700 rounded p-1 text-sm border-slate-600 border">
              <option value="apy">{SORT_OPTIONS.apy}</option>
              <option value="tvl">{SORT_OPTIONS.tvl}</option>
            </select>
          </div>
           <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-slate-400">Liquidez Mínima:</label>
            <select onChange={(e) => setMinTvl(Number(e.target.value))} value={minTvl} className="bg-slate-700 rounded p-1 text-sm border-slate-600 border">
              {Object.entries(MIN_TVL_OPTIONS).map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Lista de Cards */}
      <div className="space-y-4">
        {processedData.length > 0 ? (
          processedData.map(op => <OpportunityCard key={op.id} opportunity={op} />)
        ) : (
          <p className="text-center text-slate-400 py-8">Nenhuma oportunidade encontrada com estes filtros.</p>
        )}
      </div>
    </div>
  );
}
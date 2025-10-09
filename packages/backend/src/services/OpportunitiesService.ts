// packages/backend/src/services/OpportunitiesService.ts
import axios from 'axios';
import NodeCache from 'node-cache';

const cache = new NodeCache({ stdTTL: 600 }); // Cache de 10 minutos

interface Opportunity {
  id: string;
  project: string;
  chain: string;
  symbol: string;
  apy: number;
  tvl: number;
}

interface LlamaPool {
  pool: string;
  chain: string;
  project: string;
  symbol: string;
  apy: number;
  tvlUsd: number;
}

class OpportunitiesService {
  public async execute(): Promise<Opportunity[]> {
    const cacheKey = 'opportunities';

    const cachedData = cache.get<Opportunity[]>(cacheKey);
    if (cachedData) {
      console.log('Dados servidos do cache!');
      return cachedData;
    }

    console.log('Buscando dados frescos da API...');
    const response = await axios.get('https://yields.llama.fi/pools');
    const pools: LlamaPool[] = response.data.data;

    // --- A MUDANÇA ESTÁ AQUI ---
    // Antes: Apenas 'Polygon'. Agora: um array com múltiplas redes.
    const chainsToInclude = ['Polygon', 'Arbitrum', 'Optimism', 'Base'];
    const stablecoins = ['USDC', 'USDT', 'DAI'];

    const filteredPools = pools.filter(pool =>
      chainsToInclude.includes(pool.chain) && // <-- Linha modificada
      stablecoins.includes(pool.symbol) &&
      pool.apy > 0 && pool.apy < 100
    );
    // --- FIM DA MUDANÇA ---

    const opportunities: Opportunity[] = filteredPools.map(pool => ({
      id: pool.pool,
      project: pool.project,
      chain: pool.chain,
      symbol: pool.symbol,
      apy: parseFloat(pool.apy.toFixed(2)),
      tvl: Math.round(pool.tvlUsd),
    }));

    opportunities.sort((a, b) => b.apy - a.apy);

    cache.set(cacheKey, opportunities);

    return opportunities;
  }
}

export default OpportunitiesService;
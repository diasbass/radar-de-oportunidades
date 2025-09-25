// packages/backend/src/services/OpportunitiesService.ts
import axios from 'axios';
import NodeCache from 'node-cache';

// Nosso cache viverá por 10 minutos (600 segundos)
const cache = new NodeCache({ stdTTL: 600 });

// Definimos como será a estrutura de dados limpa que vamos entregar
interface Opportunity {
  id: string;
  project: string;
  chain: string;
  symbol: string;
  apy: number;
  tvl: number; // Total Value Locked (Liquidez)
}

// Interface para ajudar o TypeScript a entender os dados brutos da API
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

    // 1. Tenta buscar os dados do cache primeiro
    const cachedData = cache.get<Opportunity[]>(cacheKey);
    if (cachedData) {
      console.log('Dados servidos do cache!');
      return cachedData;
    }

    // 2. Se não estiver no cache, busca da API
    console.log('Buscando dados frescos da API...');
    const response = await axios.get('https://yields.llama.fi/pools');
    const pools: LlamaPool[] = response.data.data;

    const stablecoins = ['USDC', 'USDT', 'DAI'];

    // 3. Filtra apenas o que nos interessa
    const filteredPools = pools.filter(pool =>
      pool.chain === 'Polygon' && // Apenas da rede Polygon
      stablecoins.includes(pool.symbol) && // Apenas stablecoins
      pool.apy > 0 && pool.apy < 100 // Com APY realista
    );

    // 4. Formata os dados para nossa estrutura limpa
    const opportunities: Opportunity[] = filteredPools.map(pool => ({
      id: pool.pool,
      project: pool.project,
      chain: pool.chain,
      symbol: pool.symbol,
      apy: parseFloat(pool.apy.toFixed(2)),
      tvl: Math.round(pool.tvlUsd),
    }));

    // Ordena do maior APY para o menor
    opportunities.sort((a, b) => b.apy - a.apy);

    // 5. Salva os dados frescos no cache para a próxima requisição
    cache.set(cacheKey, opportunities);

    return opportunities;
  }
}

export default OpportunitiesService;
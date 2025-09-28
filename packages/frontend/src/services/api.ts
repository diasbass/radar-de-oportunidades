// src/services/api.ts
import axios from 'axios';

// --- Tipos de Dados ---
export interface Opportunity {
  id: string;
  project: string;
  chain: string;
  symbol: string;
  apy: number;
  tvl: number;
}

// --- Funções da API ---

// Busca TODAS as oportunidades
export async function fetchOpportunities(): Promise<Opportunity[]> {
  const { data } = await axios.get('/api/opportunities');
  return data;
}

// Garante que o usuário existe no nosso DB
export async function loginUser(walletAddress: string) {
  return axios.post('/api/users', { walletAddress });
}

// Busca os IDs dos favoritos de um usuário
export async function fetchFavorites(walletAddress: string): Promise<string[]> {
  const { data } = await axios.get(`/api/favorites/${walletAddress}`);
  return data;
}

// Adiciona (ou remove, no futuro) um favorito
export async function addFavorite(walletAddress: string, opportunityId: string) {
  return axios.post('/api/favorites', { walletAddress, opportunityId });
}

// --- NOVA FUNÇÃO ---
export async function removeFavorite(walletAddress: string, opportunityId: string) {
  // O método é 'delete', e passamos os dados no corpo da requisição
  return axios.delete('/api/favorites', { data: { walletAddress, opportunityId } });
}
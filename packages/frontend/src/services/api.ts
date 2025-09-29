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

export interface Alert {
  id: string;
  userId: string;
  opportunityId: string;
  targetApy: number;
  isActive: boolean;
  createdAt: string;
}

export interface User {
  id: string;
  walletAddress: string;
  email: string | null;
  subscriptionStatus: 'FREE' | 'PRO';
}

export async function fetchUser(walletAddress: string): Promise<User> {
  const { data } = await axios.post('/api/users', { walletAddress });
  return data;
}

// --- Funções da API ---

export async function fetchOpportunities(): Promise<Opportunity[]> {
  const { data } = await axios.get('/api/opportunities');
  return data;
}

export async function loginUser(walletAddress: string) {
  return axios.post('/api/users', { walletAddress });
}

export async function updateEmail(walletAddress: string, email: string) {
  return axios.patch(`/api/users/${walletAddress}`, { email });
}

export async function fetchFavorites(walletAddress: string): Promise<string[]> {
  const { data } = await axios.get(`/api/favorites/${walletAddress}`);
  return data;
}

export async function addFavorite(walletAddress: string, opportunityId: string) {
  return axios.post('/api/favorites', { walletAddress, opportunityId });
}

export async function removeFavorite(walletAddress: string, opportunityId: string) {
  return axios.delete('/api/favorites', { data: { walletAddress, opportunityId } });
}

export async function createAlert(walletAddress: string, opportunityId: string, targetApy: number) {
  return axios.post('/api/alerts', { walletAddress, opportunityId, targetApy });
}

export async function fetchAlerts(walletAddress: string): Promise<Alert[]> {
  const { data } = await axios.get(`/api/alerts/${walletAddress}`);
  return data;
}

export async function deleteAlert(walletAddress: string, alertId: string) {
  return axios.delete(`/api/alerts/${alertId}`, { data: { walletAddress } });
}

export async function createCheckoutSession(walletAddress: string): Promise<{ url: string }> {
  const { data } = await axios.post('/api/billing/create-checkout-session', { walletAddress });
  return data;
}
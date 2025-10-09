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
  subscriptionEndsAt?: string | null;
  stripeCustomerId?: string | null;
}

// --- Configuração Centralizada do Axios ---
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
});


// --- Funções da API (agora usando apiClient) ---

export async function fetchOpportunities(): Promise<Opportunity[]> {
  const { data } = await apiClient.get('/opportunities');
  return data;
}

export async function fetchUser(walletAddress: string): Promise<User> {
  const { data } = await apiClient.post('/users', { walletAddress });
  return data;
}

export async function loginUser(walletAddress: string) {
  return apiClient.post('/users', { walletAddress });
}

export async function updateEmail(walletAddress: string, email: string) {
  return apiClient.patch(`/users/${walletAddress}`, { email });
}

export async function fetchFavorites(walletAddress: string): Promise<string[]> {
  const { data } = await apiClient.get(`/favorites/${walletAddress}`);
  return data;
}

export async function toggleFavorite(walletAddress: string, opportunityId: string) {
  return apiClient.post('/favorites/toggle', { walletAddress, opportunityId });
}

export async function createAlert(walletAddress: string, opportunityId: string, targetApy: number) {
  return apiClient.post('/alerts', { walletAddress, opportunityId, targetApy });
}

export async function fetchAlerts(walletAddress: string): Promise<Alert[]> {
  const { data } = await apiClient.get(`/alerts/${walletAddress}`);
  return data;
}

export async function deleteAlert(walletAddress: string, alertId: string) {
  return apiClient.delete(`/alerts/${alertId}`, { data: { walletAddress } });
}

export async function createCheckoutSession(walletAddress: string): Promise<{ url: string }> {
  const { data } = await apiClient.post('/billing/create-checkout-session', { walletAddress });
  return data;
}
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Imports do React Query (que já tínhamos)
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Novos imports para o RainbowKit e Wagmi
import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import { polygon, arbitrum, optimism } from 'wagmi/chains';

const queryClient = new QueryClient();

// Configuração do Wagmi
const config = getDefaultConfig({
  appName: 'DeFi Yield Finder',
  projectId: 'YOUR_PROJECT_ID', // Pegue um ID em https://cloud.walletconnect.com/
  chains: [polygon, arbitrum, optimism],
  ssr: false, //  Next.js app
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <App />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>,
);
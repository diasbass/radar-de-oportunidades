import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// 1. IMPORTAR O GLOBALSTYLE AQUI
import { GlobalStyle } from './styles/GlobalStyle';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import { polygon, arbitrum, optimism } from 'wagmi/chains';

const queryClient = new QueryClient();

const config = getDefaultConfig({
  appName: 'DeFi Yield Finder',
  projectId: 'SEU_PROJECT_ID_AQUI', // Lembre-se de colocar seu Project ID do WalletConnect
  chains: [polygon, arbitrum, optimism],
  ssr: false, 
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <GlobalStyle /> {/* 2. ADICIONAR O COMPONENTE AQUI */}
          <App />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>,
);
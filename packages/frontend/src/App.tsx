import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LandingPage } from './components/LandingPage';
import { DashboardPage } from './pages/DashboardPage';
import { usePageTracking } from './hooks/usePageTracking'; // 1. Importar o hook

// 2. Criar um componente que usa o hook
const PageTracker = () => {
  usePageTracking();
  return null; // Este componente não renderiza nada na tela
};

function App() {
  return (
    <BrowserRouter>
      <PageTracker /> {/* 3. Adicionar o componente rastreador aqui */}
      <Routes>
        {/* Rota para a página principal "/" */}
        <Route path="/" element={<LandingPage />} />

        {/* Rota para o aplicativo principal "/app" */}
        <Route path="/app" element={<DashboardPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
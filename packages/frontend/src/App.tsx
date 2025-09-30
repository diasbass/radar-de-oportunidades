import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LandingPage } from './components/LandingPage';
import { DashboardPage } from './pages/DashboardPage';

function App() {
  return (
    <BrowserRouter>
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
import styled from 'styled-components';
import { OpportunityList } from './components/OpportunityList';
import { GlobalStyle } from './styles/GlobalStyle'; // Importa nosso estilo global
import { ConnectButton } from '@rainbow-me/rainbowkit';

// --- Criamos os componentes de layout aqui ---

const PageContainer = styled.div`
  min-height: 100vh;
`;

const Header = styled.header`
  border-bottom: 1px solid #334155; /* border-b border-slate-700 */
`;

// Este componente limita a largura e centraliza o conteúdo
const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 1.5rem; /* p-6 */
`;

const Title = styled.h1`
  font-size: 1.875rem; /* text-3xl */
  font-weight: bold;
  color: #22d3ee; /* text-cyan-400 */
  margin: 0;
`;

const Subtitle = styled.p`
  color: #94a3b8; /* text-slate-400 */
  margin-top: 0.25rem;
`;

function App() {
  return (
    <PageContainer>
      <GlobalStyle />
      <Header>
        <div>
          <div>
            <Title>DeFi Yield Finder</Title>
            <Subtitle>DeFi yields, simplified.</Subtitle>
          </div>
          <ConnectButton /> {/* O BOTÃO MÁGICO */}
        </div>
      </Header>
      <main>
        <Container>
          <OpportunityList />
        </Container>
      </main>
    </PageContainer>
  );
}

export default App;
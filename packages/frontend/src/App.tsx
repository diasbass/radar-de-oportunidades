import styled from 'styled-components';
import { OpportunityList } from './components/OpportunityList';
import { GlobalStyle } from './styles/GlobalStyle';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { EmailSettings } from './components/EmailSettings'; 

// --- Styled Components ---

const PageContainer = styled.div`
  min-height: 100vh;
`;

// O Header agora tem um padding vertical para mais respiro.
const Header = styled.header`
  border-bottom: 1px solid #334155;
  padding: 1rem 0;
`;

// O Container é o responsável por centralizar e limitar a largura.
const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 1.5rem; /* Padding horizontal para telas menores */
`;

// NOVO: Container específico para o Header, com flexbox para o alinhamento.
const HeaderContainer = styled(Container)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TitleBlock = styled.div``; // Div para agrupar título e subtítulo

const Title = styled.h1`
  font-size: 1.875rem;
  font-weight: bold;
  color: #22d3ee;
  margin: 0;
`;

const Subtitle = styled.p`
  color: #94a3b8;
  margin-top: 0.25rem;
  margin-bottom: 0;
`;

const MainContent = styled.main`
  padding: 1.5rem 0;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

function App() {
  return (
    <PageContainer>
      <GlobalStyle />
      <Header>
        <HeaderContainer>
          <TitleBlock>
            <Title>DeFi Yield Finder</Title>
            <Subtitle>DeFi yields, simplified.</Subtitle>
          </TitleBlock>
          <ConnectButton />
        </HeaderContainer>
      </Header>
      <MainContent>
        <Container>
          <ContentWrapper>
            <EmailSettings />
            {/* O AlertsDashboard será adicionado aqui depois */}
            <OpportunityList />
          </ContentWrapper>
        </Container>
      </MainContent>
    </PageContainer>
  );
}

export default App;
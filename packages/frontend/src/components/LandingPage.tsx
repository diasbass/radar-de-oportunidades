import styled from 'styled-components';

// --- Interfaces ---
interface LandingPageProps {
  onLaunchApp: () => void; // Função para ser chamada quando o botão principal for clicado
}

// --- Styled Components para a Landing Page ---
const LandingContainer = styled.div`
  background-color: #0f172a; /* bg-slate-900 */
  color: #f8fafc; /* text-slate-50 */
  min-height: 100vh;
`;

const Section = styled.section`
  max-width: 900px;
  margin: 0 auto;
  padding: 4rem 1.5rem;
  text-align: center;
`;

const HeroSection = styled(Section)`
  padding-top: 6rem;
  padding-bottom: 6rem;
`;

const Title = styled.h1`
  font-size: 3.75rem; /* text-6xl */
  font-weight: bold;
  color: white;
  margin: 0;
  background: linear-gradient(to right, #22d3ee, #a5f3fc);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Subtitle = styled.p`
  font-size: 1.25rem; /* text-xl */
  color: #94a3b8; /* text-slate-400 */
  margin-top: 1rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const CTAButton = styled.button`
  background-color: #22d3ee;
  color: #0f172a;
  font-weight: bold;
  border: none;
  border-radius: 0.5rem;
  padding: 1rem 2rem;
  font-size: 1rem;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  margin-top: 2rem;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(34, 211, 238, 0.2);
  }
`;

const SectionTitle = styled.h2`
  font-size: 2.25rem; /* text-4xl */
  font-weight: bold;
  margin-bottom: 2rem;
`;

const RoadmapContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  text-align: left;
`;

const RoadmapColumn = styled.div`
  background-color: #1e293b;
  padding: 1.5rem;
  border-radius: 0.75rem;
  border: 1px solid #334155;
  width: 30%;
`;

const RoadmapTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: bold;
  color: #22d3ee;
  margin-top: 0;
`;

const RoadmapList = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 1rem;
  color: #cbd5e1;
`;

const RoadmapItem = styled.li`
  margin-bottom: 0.5rem;
  &::before {
    content: '✓';
    color: #4ade80; /* green-400 */
    margin-right: 0.5rem;
  }
`;

const Footer = styled.footer`
  text-align: center;
  padding: 2rem;
  color: #64748b; /* slate-500 */
  border-top: 1px solid #334155;
`;

// --- Componente Principal ---
export function LandingPage({ onLaunchApp }: LandingPageProps) {
  return (
    <LandingContainer>
      <HeroSection>
        <Title>DeFi Yield Finder</Title>
        <Subtitle>
          DeFi yields, simplified. Find the best stablecoin yields across multiple chains with real-time data.
        </Subtitle>
        <CTAButton onClick={onLaunchApp}>
          Launch App
        </CTAButton>
      </HeroSection>

      {/* Você pode adicionar as seções de Features e PRO aqui depois */}

      <Section>
        <SectionTitle>Roadmap</SectionTitle>
        <RoadmapContainer>
          <RoadmapColumn>
            <RoadmapTitle>Now</RoadmapTitle>
            <RoadmapList>
              <RoadmapItem>Multi-Chain Yield Finder</RoadmapItem>
              <RoadmapItem>PRO: Favorites & APY Alerts</RoadmapItem>
              <RoadmapItem>WalletConnect Login</RoadmapItem>
              <RoadmapItem>Stripe Subscriptions</RoadmapItem>
            </RoadmapList>
          </RoadmapColumn>
          <RoadmapColumn>
            <RoadmapTitle>Next</RoadmapTitle>
            <RoadmapList>
              <RoadmapItem>User Dashboard</RoadmapItem>
              <RoadmapItem>More Chains (Base, Avalanche)</RoadmapItem>
              <RoadmapItem>Advanced Alert Types</RoadmapItem>
            </RoadmapList>
          </RoadmapColumn>
          <RoadmapColumn>
            <RoadmapTitle>Later</RoadmapTitle>
            <RoadmapList>
              <RoadmapItem>Historical APY Charts</RoadmapItem>
              <RoadmapItem>Portfolio Analytics</RoadmapItem>
              <RoadmapItem>Governance Token</RoadmapItem>
            </RoadmapList>
          </RoadmapColumn>
        </RoadmapContainer>
      </Section>

      <Footer>
        <p>© {new Date().getFullYear()} DeFi Yield Finder. All rights reserved.</p>
      </Footer>
    </LandingContainer>
  );
}
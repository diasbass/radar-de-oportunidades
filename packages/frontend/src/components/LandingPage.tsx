import styled from 'styled-components';
import { Link } from 'react-router-dom';
// 1. Importando os ícones que vamos usar
import { FiGitMerge, FiBell, FiBarChart2 } from 'react-icons/fi';

// --- Styled Components ---
const LandingContainer = styled.div`
  background-color: #0f172a;
  color: #f8fafc;
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
  font-size: 3.75rem;
  font-weight: bold;
  color: white;
  margin: 0;
  background: linear-gradient(to right, #22d3ee, #a5f3fc);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;
const Subtitle = styled.p`
  font-size: 1.25rem;
  color: #94a3b8;
  margin-top: 1rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;
const CTAButton = styled(Link)`
  display: inline-block;
  background-color: #22d3ee;
  color: #0f172a;
  font-weight: bold;
  border: none;
  border-radius: 0.5rem;
  padding: 1rem 2rem;
  font-size: 1rem;
  cursor: pointer;
  text-decoration: none;
  transition: transform 0.2s, box-shadow 0.2s;
  margin-top: 2rem;
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(34, 211, 238, 0.2);
  }
`;
const SectionTitle = styled.h2`
  font-size: 2.25rem;
  font-weight: bold;
  margin-bottom: 3rem; /* Aumenta o espaço */
`;

// --- NOVOS STYLES PARA A SEÇÃO DE FEATURES ---
const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  text-align: left;
`;

const FeatureCard = styled.div`
  background-color: #1e293b;
  padding: 1.5rem;
  border-radius: 0.75rem;
  border: 1px solid #334155;
`;

const IconWrapper = styled.div`
  font-size: 2.5rem;
  color: #22d3ee;
  margin-bottom: 1rem;
`;

const FeatureTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: bold;
  color: white;
  margin: 0 0 0.5rem 0;
`;

const FeatureDescription = styled.p`
  color: #94a3b8;
  font-size: 0.875rem;
  line-height: 1.5;
  margin: 0;
`;
// --- FIM DOS NOVOS STYLES ---

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
    color: #4ade80;
    margin-right: 0.5rem;
  }
`;
const Footer = styled.footer`
  text-align: center;
  padding: 2rem;
  color: #64748b;
  border-top: 1px solid #334155;
`;

// --- Componente Principal ---
export function LandingPage() {
  return (
    <LandingContainer>
      <HeroSection>
        <Title>DeFi Yield Finder</Title>
        <Subtitle>
          DeFi yields, simplified. Find the best stablecoin yields across multiple chains with real-time data.
        </Subtitle>
        <CTAButton to="/app">
          Launch App
        </CTAButton>
      </HeroSection>

      {/* --- NOVA SEÇÃO DE FEATURES ADICIONADA --- */}
      <Section>
        <SectionTitle>Core Features</SectionTitle>
        <FeaturesGrid>
          <FeatureCard>
            <IconWrapper><FiGitMerge /></IconWrapper>
            <FeatureTitle>Multi-Chain Coverage</FeatureTitle>
            <FeatureDescription>
              Compare the best yields for stablecoins across major networks like Polygon, Arbitrum, and Optimism in one place.
            </FeatureDescription>
          </FeatureCard>
          <FeatureCard>
            <IconWrapper><FiBarChart2 /></IconWrapper>
            <FeatureTitle>Real-Time Data</FeatureTitle>
            <FeatureDescription>
              Our data is constantly updated to ensure you are seeing the most current APYs available in the market.
            </FeatureDescription>
          </FeatureCard>
          <FeatureCard>
            <IconWrapper><FiBell /></IconWrapper>
            <FeatureTitle>PRO: APY Alerts</FeatureTitle>
            <FeatureDescription>
              Upgrade to PRO and set personalized alerts to be notified by email when an opportunity reaches your target APY.
            </FeatureDescription>
          </FeatureCard>
        </FeaturesGrid>
      </Section>

      {/* --- ROADMAP ATUALIZADO --- */}
      <Section>
        <SectionTitle>Roadmap</SectionTitle>
        <RoadmapContainer>
          <RoadmapColumn>
            <RoadmapTitle>Now</RoadmapTitle>
            <RoadmapList>
              <RoadmapItem>Multi-Chain Yield Finder</RoadmapItem>
              <RoadmapItem>PRO: Favorites & APY Alerts</RoadmapItem>
              <RoadmapItem>Stripe Subscriptions</RoadmapItem>
              <RoadmapItem>Live on Vercel & Render</RoadmapItem>
            </RoadmapList>
          </RoadmapColumn>
          <RoadmapColumn>
            <RoadmapTitle>Next</RoadmapTitle>
            <RoadmapList>
              <RoadmapItem>User Dashboard</RoadmapItem>
              <RoadmapItem>Reliable Cron Job (GitHub Actions)</RoadmapItem>
              <RoadmapItem>More Chains (e.g., Base)</RoadmapItem>
              <RoadmapItem>Stripe Billing Portal</RoadmapItem>
            </RoadmapList>
          </RoadmapColumn>
          <RoadmapColumn>
            <RoadmapTitle>Later</RoadmapTitle>
            <RoadmapList>
              <RoadmapItem>Historical APY Charts</RoadmapItem>
              <RoadmapItem>Decentralized Payments (USDT)</RoadmapItem>
              <RoadmapItem>Affiliate Program</RoadmapItem>
              <RoadmapItem>Portfolio Analytics</RoadmapItem>
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
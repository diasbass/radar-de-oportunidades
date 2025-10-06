// src/pages/FeaturesPage.tsx

import styled from 'styled-components';
// Importe os componentes de layout que você já tem na LandingPage
// DICA: Considere mover componentes reutilizáveis (Section, Title, Footer, etc.) para um arquivo comum.
import {
  Section,
  SectionTitle,
  Footer,
  FeatureCard,
  IconWrapper,
  FeatureTitle,
  FeatureDescription,
  CTAButton,
  FooterNav,  // Import new component
  FooterLink  // Import new component
} from './ui/Layout'; // Ajuste o caminho conforme sua estrutura de pastas
import { FiGitMerge, FiBarChart2, FiFilter, FiBell, FiHeart, FiUser } from 'react-icons/fi';

const FeaturesContainer = styled.div`
  background-color: #0f172a;
  color: #f8fafc;
  min-height: 100vh;
`;

const IntroText = styled.p`
  font-size: 1.125rem;
  color: #94a3b8;
  max-width: 600px;
  margin: -2rem auto 4rem auto; /* Espaçamento negativo para ficar mais perto do título */
  text-align: center;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  text-align: left;
  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const FinalCTASection = styled(Section)`
  background-color: #1e293b;
  border-radius: 1rem;
  margin-top: 4rem;
`;

export function FeaturesPage() {
  return (
    <FeaturesContainer>
      <Section>
        <SectionTitle>Powerful Features to Maximize Your DeFi Returns</SectionTitle>
        <IntroText>
          We provide a full suite of tools designed to simplify your yield farming strategy, from discovery to tracking.
        </IntroText>

        {/* --- FREE FEATURES --- */}
        <FeatureTitle as="h2" style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '1.5rem' }}>
          Core Features (Free for Everyone)
        </FeatureTitle>
        <FeaturesGrid>
          <FeatureCard>
            <IconWrapper><FiGitMerge /></IconWrapper>
            <FeatureTitle>Multi-Chain Coverage</FeatureTitle>
            <FeatureDescription>
              Don't limit your earnings. We aggregate opportunities from Polygon, Arbitrum, Optimism, and more to come, giving you a complete market overview.
            </FeatureDescription>
          </FeatureCard>
          <FeatureCard>
            <IconWrapper><FiBarChart2 /></IconWrapper>
            <FeatureTitle>Real-Time Data</FeatureTitle>
            <FeatureDescription>
              Data is sourced directly from DeFi Llama's trusted API and cached for speed, ensuring you see the most current APYs available.
            </FeatureDescription>
          </FeatureCard>
           <FeatureCard>
            <IconWrapper><FiFilter /></IconWrapper>
            <FeatureTitle>Advanced Filtering & Sorting</FeatureTitle>
            <FeatureDescription>
              Easily sort by the highest APY or the largest Total Value Locked (TVL). Filter by network or set a minimum liquidity to match your risk profile.
            </FeatureDescription>
          </FeatureCard>
        </FeaturesGrid>

        {/* --- PRO FEATURES --- */}
        <FeatureTitle as="h2" style={{ textAlign: 'center', marginTop: '4rem', marginBottom: '2rem', fontSize: '1.5rem' }}>
          Upgrade to PRO and Unlock Your Full Potential
        </FeatureTitle>
        <FeaturesGrid>
          <FeatureCard>
            <IconWrapper><FiBell /></IconWrapper>
            <FeatureTitle>Custom APY Alerts</FeatureTitle>
            <FeatureDescription>
              Never miss an opportunity. Set a target APY for any pool and get an instant email notification the moment it's reached.
            </FeatureDescription>
          </FeatureCard>
          <FeatureCard>
            <IconWrapper><FiHeart /></IconWrapper>
            <FeatureTitle>Favorites List</FeatureTitle>
            <FeatureDescription>
              Bookmark the opportunities you're interested in. Keep a clean, dedicated list of pools you want to monitor closely.
            </FeatureDescription>
          </FeatureCard>
           <FeatureCard>
            <IconWrapper><FiUser /></IconWrapper>
            <FeatureTitle>Personal User Dashboard</FeatureTitle>
            <FeatureDescription>
              A dedicated space (coming soon) to manage your alerts, favorites, and subscription settings all in one place.
            </FeatureDescription>
          </FeatureCard>
        </FeaturesGrid>
      </Section>

      <FinalCTASection>
          <SectionTitle>Ready to Get Started?</SectionTitle>
          <p style={{ color: '#94a3b8', maxWidth: '500px', margin: '0 auto 2rem auto' }}>
            Explore the best DeFi yields on the market right now. Your next great investment is just a click away.
          </p>
          <CTAButton to="/app">Launch Free App</CTAButton>
      </FinalCTASection>

      <Footer>
        <FooterNav>
          <FooterLink to="/">Home</FooterLink>
          <FooterLink to="/features">Features</FooterLink>
          <FooterLink to="/app">Launch App</FooterLink>
        </FooterNav>
        <p>© {new Date().getFullYear()} DeFi Yield Finder. All rights reserved.</p>
      </Footer>
    </FeaturesContainer>
  );
}
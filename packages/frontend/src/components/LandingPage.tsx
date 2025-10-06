import { FiGitMerge, FiBell, FiBarChart2, FiClock, FiFilter } from 'react-icons/fi';

import {
  Section,
  SectionTitle,
  Footer,
  FeatureCard,
  IconWrapper,
  FeatureTitle,
  FeaturesGrid,
  FeatureDescription,
  CTAButton,
  LandingContainer,
  HeroSection,
  Title,
  Subtitle,
  HowItWorksGrid,
  ExplanationBlock,
  BenefitList,
  BenefitItem,
  BenefitIcon,
  BenefitText,
  BenefitTitle,
  BenefitDescription,
  RoadmapContainer,
  RoadmapColumn,
  RoadmapTitle,
  RoadmapList,
  RoadmapItem,
  FooterNav,  // Import new component
  FooterLink  // Import new component
} from './ui/Layout'; // Ajuste o caminho conforme sua estrutura de pastas

// --- Componente Principal ---
export function LandingPage() {
  return (
    <LandingContainer>
      {/* --- HERO SECTION CHANGES START HERE --- */}
      <HeroSection data-section="section_destaque">
        <Title>DeFi Yields, Simplified. Find the Best Stablecoin APY in Seconds.</Title>
        <Subtitle>
          Stop switching between dozens of platforms. We centralize the best real-time yield opportunities for your stablecoins (USDC, USDT, DAI) across Polygon, Arbitrum, Optimism, and more.
        </Subtitle>
        <CTAButton to="/app" data-element="button_launch-app">
          Launch App for Free
        </CTAButton>
      </HeroSection>
      {/* --- HERO SECTION CHANGES END HERE --- */}

      <Section>
        <SectionTitle>Stop Wasting Time, Start Earning More</SectionTitle>
        <HowItWorksGrid>
          <ExplanationBlock>
            <FeatureTitle>Earning Interest on Digital Dollars</FeatureTitle>
            <FeatureDescription>
              Imagine a high-yield savings account, but for "digital dollars" (stablecoins). In the world of Decentralized Finance (DeFi), you can do just that by providing your tokens to <strong>"liquidity pools."</strong> These pools are collective funds that enable transactions and lending, and in return, you, as a liquidity provider, are rewarded with interest (yields).
              <br /><br />
              The challenge? There are thousands of these opportunities scattered across dozens of platforms and different blockchains. Finding the best and safest ones is a complex task.
            </FeatureDescription>
          </ExplanationBlock>
          <BenefitList>
            <BenefitItem>
              <BenefitIcon><FiClock /></BenefitIcon>
              <BenefitText>
                <BenefitTitle>Save Time</BenefitTitle>
                <BenefitDescription>
                  No more jumping between dozens of sites and spreadsheets. We centralize the best opportunities in one single place.
                </BenefitDescription>
              </BenefitText>
            </BenefitItem>
            <BenefitItem>
              <BenefitIcon><FiBarChart2 /></BenefitIcon>
              <BenefitText>
                <BenefitTitle>Maximize Your Earnings</BenefitTitle>
                <BenefitDescription>
                  With real-time data and powerful filters, you can quickly find the highest interest rates (APY) on the market.
                </BenefitDescription>
              </BenefitText>
            </BenefitItem>
            <BenefitItem>
              <BenefitIcon><FiFilter /></BenefitIcon>
              <BenefitText>
                <BenefitTitle>Simplify the Complex</BenefitTitle>
                <BenefitDescription>
                  We present the essential information in a clear and straightforward way, allowing you to make informed decisions without getting lost in technical jargon.
                </BenefitDescription>
              </BenefitText>
            </BenefitItem>
          </BenefitList>
        </HowItWorksGrid>
      </Section>

      <Section>
        <SectionTitle>All The Tools You Need To Succeed in DeFi</SectionTitle>
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

      <Section>
        <SectionTitle>Public Roadmap</SectionTitle>
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
        <FooterNav>
          <FooterLink to="/">Home</FooterLink>
          <FooterLink to="/features">Features</FooterLink>
          <FooterLink to="/app">Launch App</FooterLink>
        </FooterNav>
        <p>© {new Date().getFullYear()} DeFi Yield Finder. All rights reserved.</p>
      </Footer>
    </LandingContainer>
  );
}
import { Link } from 'react-router-dom';
import styled from 'styled-components';

// Todos os componentes de layout e estilo que você quer reutilizar
// vão aqui, já com "export".

// --- Styled Components (No changes here) ---
export const LandingContainer = styled.div`
  background-color: #0f172a;
  color: #f8fafc;
  min-height: 100vh;
`;
export const Section = styled.section`
  max-width: 900px;
  margin: 0 auto;
  padding: 4rem 1.5rem;
  text-align: center;
`;
export const HeroSection = styled(Section)`
  padding-top: 6rem;
  padding-bottom: 6rem;
`;
export const Title = styled.h1`
  font-size: 2.75rem;
  font-weight: bold;
  color: white;
  margin: 0;
  background: linear-gradient(to right, #22d3ee, #a5f3fc);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  @media (min-width: 768px) {
    font-size: 3.75rem;
  }
`;
export const Subtitle = styled.p`
  font-size: 1.125rem;
  color: #94a3b8;
  margin-top: 1rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  @media (min-width: 768px) {
    font-size: 1.25rem;
  }
`;
export const CTAButton = styled(Link)`
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
export const SectionTitle = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 3rem;
  @media (min-width: 768px) {
    font-size: 2.25rem;
  }
`;
export const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  text-align: left;
  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;
export const FeatureCard = styled.div`
  background-color: #1e293b;
  padding: 1.5rem;
  border-radius: 0.75rem;
  border: 1px solid #334155;
`;
export const IconWrapper = styled.div`
  font-size: 2.5rem;
  color: #22d3ee;
  margin-bottom: 1rem;
`;
export const FeatureTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: bold;
  color: white;
  margin: 0 0 0.5rem 0;
`;
export const FeatureDescription = styled.p`
  color: #94a3b8;
  font-size: 0.875rem;
  line-height: 1.5;
  margin: 0;
`;
export const HowItWorksGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
  text-align: left;
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;
export const ExplanationBlock = styled.div``;
export const BenefitList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;
export const BenefitItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
`;
export const BenefitIcon = styled.div`
  font-size: 1.5rem;
  color: #22d3ee;
  margin-top: 4px;
`;
export const BenefitText = styled.div``;
export const BenefitTitle = styled.h4`
  font-size: 1.125rem;
  font-weight: bold;
  margin: 0 0 0.25rem 0;
  color: white;
`;
export const BenefitDescription = styled.p`
  color: #94a3b8;
  font-size: 0.875rem;
  line-height: 1.5;
  margin: 0;
`;
export const RoadmapContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  text-align: left;
  @media (min-width: 768px) {
    flex-direction: row;
    align-items: flex-start;
  }
`;
export const RoadmapColumn = styled.div`
  background-color: #1e293b;
  padding: 1.5rem;
  border-radius: 0.75rem;
  border: 1px solid #334155;
  width: 100%;
  @media (min-width: 768px) {
    width: 30%;
  }
`;
export const RoadmapTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: bold;
  color: #22d3ee;
  margin-top: 0;
`;
export const RoadmapList = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 1rem;
  color: #cbd5e1;
`;
export const RoadmapItem = styled.li`
  margin-bottom: 0.5rem;
  &::before {
    content: '✓';
    color: #4ade80;
    margin-right: 0.5rem;
  }
`;
export const Footer = styled.footer`
  text-align: center;
  padding: 2rem;
  color: #64748b;
  border-top: 1px solid #334155;
`;
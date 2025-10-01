import styled from 'styled-components';

// --- Interfaces ---
interface OpportunityCardProps {
  opportunity: {
    id: string;
    project: string;
    chain: string;
    symbol: string;
    apy: number;
    tvl: number;
  };
  isFavorite: boolean;
  onToggleFavorite: () => void;
  isConnected: boolean;
  onOpenAlertModal: () => void;
  isPro: boolean;
}

// --- Formatador de Moeda ---
const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

// --- Styled Components ---
const CardContainer = styled.div`
  background-color: #1e293b;
  border-radius: 0.5rem;
  padding: 1rem;
  border: 1px solid #334155;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: border-color 0.2s;
  &:hover {
    border-color: #22d3ee;
  }
`;
const InfoSection = styled.div``;
const ProjectName = styled.p`
  font-size: 1.125rem;
  font-weight: bold;
`;
const TokenSymbol = styled.p`
  font-size: 0.875rem;
  color: #94a3b8;
`;
const DataSection = styled.div`
  text-align: right;
`;
const APY = styled.p`
  font-size: 1.25rem;
  font-weight: bold;
  color: #4ade80;
`;
const TVL = styled.p`
  font-size: 0.75rem;
  color: #94a3b8;
`;
const RightContent = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;
const ActionButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  color: #64748b;
  transition: color 0.2s, transform 0.2s;
  display: flex;
  align-items: center;
  &:hover {
    color: #facc15;
    transform: scale(1.1);
  }
`;
const FavoriteButton = styled(ActionButton)<{ $isFavorite: boolean }>`
  color: ${props => props.$isFavorite ? '#facc15' : '#64748b'};
`;

// --- Componente Principal ---
export function OpportunityCard({ opportunity, isFavorite, onToggleFavorite, isConnected, onOpenAlertModal, isPro }: OpportunityCardProps) {
  return (
    <CardContainer>
      <InfoSection>
        <ProjectName>{opportunity.project}</ProjectName>
        <TokenSymbol>{opportunity.symbol}</TokenSymbol>
      </InfoSection>
      <RightContent>
        <DataSection>
          <APY>{opportunity.apy}%</APY>
          <TVL>Liquidity: {currencyFormatter.format(opportunity.tvl)}</TVL>
        </DataSection>
        
        {isConnected && isPro && (
          <>
            <FavoriteButton onClick={onToggleFavorite} $isFavorite={isFavorite} title="Toggle Favorite">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill={isFavorite ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </svg>
            </FavoriteButton>
            <ActionButton onClick={onOpenAlertModal} title="Create Alert">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path>
                <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path>
              </svg>
            </ActionButton>
          </>
        )}
      </RightContent>
    </CardContainer>
  );
}
import { useEffect } from 'react';
import styled from 'styled-components';
import { OpportunityList } from '../components/OpportunityList';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { EmailSettings } from '../components/EmailSettings';
import { UpgradeButton } from '../components/UpgradeButton';
import { useAccount } from 'wagmi';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchUser, User } from '../services/api';
import { SubscriptionStatus } from '../components/SubscriptionStatus';

// --- Styled Components ---
const PageContainer = styled.div`
  min-height: 100vh;
`;
const Header = styled.header`
  border-bottom: 1px solid #334155;
  padding: 1rem 0;
`;
const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 1.5rem;
`;
const HeaderContainer = styled(Container)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const TitleBlock = styled.div``;
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
const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export function DashboardPage() {
  const { address, isConnected } = useAccount();
  const queryClient = useQueryClient();

  const { data: user } = useQuery<User>({
    queryKey: ['user', address],
    queryFn: () => fetchUser(address!),
    enabled: !!address,
  });

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('payment_success')) {
      queryClient.invalidateQueries({ queryKey: ['user', address] });
    }
  }, [address, queryClient]);
  
  const isPro = user?.subscriptionStatus === 'PRO';

  return (
    <PageContainer>
      <Header>
        <HeaderContainer>
          <TitleBlock>
            <Title>DeFi Yield Finder</Title>
            <Subtitle>DeFi yields, simplified.</Subtitle>
          </TitleBlock>
          <HeaderActions data-section="section_connect-wallet">
            {isConnected && !isPro && <UpgradeButton />}
            {isConnected && isPro && <SubscriptionStatus />}
            <ConnectButton data-element="button_connect-wallet" />
          </HeaderActions>
        </HeaderContainer>
      </Header>
      <MainContent>
        <Container>
          <ContentWrapper>
            {isPro && <EmailSettings />}
            <OpportunityList user={user} />
          </ContentWrapper>
        </Container>
      </MainContent>
    </PageContainer>
  );
}
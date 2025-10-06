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

// --- Styled Components (sem alterações) ---
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

const CustomConnectButton = styled.button`
  background-color: #334155;
  color: white;
  border: 1px solid #475569;
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: #cbd5e1;
  }
`;

// Declaramos a window com o tipo do dataLayer para o TypeScript
interface WindowWithDataLayer extends Window {
  dataLayer: any[];
}
declare const window: WindowWithDataLayer;


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
      // Invalida o cache do usuário para buscar o status PRO
      queryClient.invalidateQueries({ queryKey: ['user', address] });
      
      // --- LÓGICA DO dataLayer.push ADICIONADA AQUI ---
      if (window.dataLayer) {
        const transactionId = `txn-${new Date().getTime()}`; // Gera um ID de transação único

        window.dataLayer.push({
          'event': 'product_purchased',
          'transaction': {
            'currency': 'USD',
            'id': transactionId, 
            'affiliation': 'Stripe',
            'value': 6.99 
          },
          'product_details': [
            {
              'item_name': 'DeFi Yield Finder PRO', // Nome do produto
              'item_id': 'DYF_PRO_MONTHLY', // Um ID/SKU para seu produto
              'price': 6.99,
              'discount': 0,
              'currency': 'USD',
              'item_brand': 'DeFi Yield Finder',
            }
          ]
        });
      }
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
            {isConnected && !isPro && <UpgradeButton data-element="button_upgrade" />}
            {isConnected && isPro && <SubscriptionStatus />}
            
            <ConnectButton.Custom>
              {({
                account,
                chain,
                openAccountModal,
                openChainModal,
                openConnectModal,
                authenticationStatus,
                mounted,
              }) => {
                const ready = mounted && authenticationStatus !== 'loading';
                const connected =
                  ready &&
                  account &&
                  chain &&
                  (!authenticationStatus ||
                    authenticationStatus === 'authenticated');

                return (
                  <div
                    {...(!ready && {
                      'aria-hidden': true,
                      'style': {
                        opacity: 0,
                        pointerEvents: 'none',
                        userSelect: 'none',
                      },
                    })}
                  >
                    {(() => {
                      if (!connected) {
                        return (
                          <CustomConnectButton
                            onClick={openConnectModal}
                            type="button"
                            data-element="button_connect-wallet"
                          >
                            Connect Wallet
                          </CustomConnectButton>
                        );
                      }

                      if (chain.unsupported) {
                        return (
                          <CustomConnectButton onClick={openChainModal} type="button">
                            Wrong network
                          </CustomConnectButton>
                        );
                      }

                      return (
                        <CustomConnectButton onClick={openAccountModal} type="button">
                          {account.displayName}
                        </CustomConnectButton>
                      );
                    })()}
                  </div>
                );
              }}
            </ConnectButton.Custom>
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
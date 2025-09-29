import { useMutation } from '@tanstack/react-query';
import { useAccount } from 'wagmi';
import styled from 'styled-components';
import { createCheckoutSession } from '../services/api';

const StyledButton = styled.button`
  background-color: #facc15; /* Amarelo */
  color: #1c1917; /* Preto/Cinza escuro */
  font-weight: bold;
  border: none;
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export function UpgradeButton() {
  const { address, isConnected } = useAccount();

  const { mutate, isPending } = useMutation({
    mutationFn: () => createCheckoutSession(address!),
    onSuccess: (data) => {
      // Se a chamada à API for bem-sucedida, redireciona para a URL do Stripe
      if (data.url) {
        window.location.href = data.url;
      }
    },
    onError: (error) => {
      console.error("Failed to create checkout session:", error);
      alert("Could not redirect to payment page. Please try again later.");
    },
  });

  // Não mostra o botão se o usuário não estiver conectado
  if (!isConnected) {
    return null;
  }

  const handleUpgradeClick = () => {
    if (address) {
      mutate();
    }
  };

  return (
    <StyledButton onClick={handleUpgradeClick} disabled={isPending}>
      {isPending ? 'Redirecting...' : 'Upgrade to PRO'}
    </StyledButton>
  );
}
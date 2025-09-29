import styled from 'styled-components';

const StatusBadge = styled.div`
  background-color: #facc15;
  color: #1c1917;
  font-weight: bold;
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
`;

export function SubscriptionStatus() {
  return <StatusBadge>PRO Member ✨</StatusBadge>;
}
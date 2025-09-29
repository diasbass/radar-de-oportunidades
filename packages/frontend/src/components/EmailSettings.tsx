import { useAccount } from 'wagmi';
import styled from 'styled-components';
import { updateEmail } from '../services/api';

const SettingsContainer = styled.div`
  background-color: #1e293b;
  padding: 1rem;
  border-radius: 0.5rem;
  border: 1px solid #334155;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Title = styled.h3`
  margin: 0;
  font-size: 1.125rem;
  font-weight: bold;
`;

const Form = styled.form`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

const Input = styled.input`
  background-color: #334155;
  border: 1px solid #475569;
  border-radius: 0.375rem;
  padding: 0.5rem;
  color: white;
  flex-grow: 1;
`;

const Button = styled.button`
  background-color: #22d3ee;
  color: #0f172a;
  font-weight: bold;
  border: none;
  border-radius: 0.375rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }
`;

export function EmailSettings() {
  const { address, isConnected } = useAccount();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!address) return;

    const formData = new FormData(event.currentTarget);
    const email = formData.get('email') as string;

    try {
      await updateEmail(address, email);
      alert('Email saved successfully!');
    } catch {
      alert('Failed to save email.');
    }
  };

  if (!isConnected) {
    return null; // Não mostra nada se não estiver conectado
  }

  return (
    <SettingsContainer>
      <Title>Alert Settings</Title>
      <p style={{margin: 0, fontSize: '0.875rem', color: '#94a3b8'}}>
        Enter your email to receive APY notifications.
      </p>
      <Form onSubmit={handleSubmit}>
        <Input type="email" name="email" placeholder="yourmail@example.com" required />
        <Button type="submit">Submit</Button>
      </Form>
    </SettingsContainer>
  );
}
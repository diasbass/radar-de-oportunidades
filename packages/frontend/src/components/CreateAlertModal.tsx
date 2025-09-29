import { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import * as Dialog from '@radix-ui/react-dialog';
import { Opportunity } from '../services/api';

// --- Interfaces (Props) ---
interface CreateAlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (targetApy: number) => void;
  opportunity: Opportunity;
}

// --- Animações e Styled Components (sem alterações) ---
const overlayShow = keyframes`from { opacity: 0; } to { opacity: 1; }`;
const contentShow = keyframes`from { opacity: 0; transform: translate(-50%, -48%) scale(0.96); } to { opacity: 1; transform: translate(-50%, -50%) scale(1); }`;
const StyledOverlay = styled(Dialog.Overlay)`
  background-color: rgba(0, 0, 0, 0.7);
  position: fixed;
  inset: 0;
  animation: ${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1);
`;
const StyledContent = styled(Dialog.Content)`
  background-color: #1e293b;
  border-radius: 0.5rem;
  box-shadow: hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90vw;
  max-width: 450px;
  padding: 1.5rem;
  animation: ${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1);
  &:focus { outline: none; }
`;
const StyledTitle = styled(Dialog.Title)`
  margin: 0;
  font-weight: bold;
  color: white;
  font-size: 1.25rem;
`;
const StyledDescription = styled(Dialog.Description)`
  margin-top: 0.5rem;
  color: #94a3b8;
  font-size: 0.875rem;
  line-height: 1.4;
`;
const InputLabel = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  color: #cbd5e1;
  margin-bottom: 0.5rem;
  display: block;
`;
const Input = styled.input`
  width: 100%;
  background-color: #334155;
  border: 1px solid #475569;
  border-radius: 0.375rem;
  padding: 0.75rem;
  color: white;
  box-sizing: border-box;
`;
const Hint = styled.p`
  font-size: 0.75rem;
  color: #94a3b8;
  margin-top: 0.5rem;
`;
const Flex = styled.div`
  display: flex;
  margin-top: 1.5rem;
  justify-content: flex-end;
`;
const Button = styled.button`
  background-color: #22d3ee;
  color: #0f172a;
  font-weight: bold;
  border: none;
  border-radius: 0.375rem;
  padding: 0.75rem 1.5rem;
  cursor: pointer;
  transition: opacity 0.2s;
  &:hover { opacity: 0.9; }
`;

// --- Componente Principal ---
export function CreateAlertModal({ isOpen, onClose, onCreate, opportunity }: CreateAlertModalProps) {
  const [apy, setApy] = useState('');

  const handleCreate = () => {
    const targetApy = parseFloat(apy);
    if (!isNaN(targetApy) && targetApy > 0) {
      onCreate(targetApy);
    } else {
      alert("Please enter a valid APY value.");
    }
  };
  
  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <StyledOverlay />
        <StyledContent>
          <StyledTitle>
            Alert for: {opportunity.project} ({opportunity.symbol})
          </StyledTitle>
          <StyledDescription>
            Current APY is {opportunity.apy}%. You will be notified when it exceeds the target value.
          </StyledDescription>
          
          <div style={{ marginTop: '1.5rem' }}>
            <InputLabel htmlFor="apy">Target APY (%)</InputLabel>
            <Input 
              id="apy"
              type="number"
              placeholder="E.g., 7.5"
              value={apy}
              onChange={(e) => setApy(e.target.value)}
            />
            <Hint>Enter the desired percentage value. Example: 7.5 for 7.5%.</Hint>
          </div>

          <Flex>
            <Button onClick={handleCreate}>Create Alert</Button>
          </Flex>
        </StyledContent>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
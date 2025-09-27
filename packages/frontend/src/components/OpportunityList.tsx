import { useState, useMemo, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAccount } from 'wagmi';
import styled from 'styled-components';
import { OpportunityCard } from './OpportunityCard';
import { OpportunitySkeleton } from './OpportunitySkeleton';
// A importação 'Opportunity' foi removida da linha abaixo
import { fetchOpportunities, fetchFavorites, addFavorite, loginUser } from '../services/api';

// --- Constantes ---
const CHAINS = ['Polygon', 'Arbitrum', 'Optimism'];
const SORT_OPTIONS = { apy: 'Highest APY', tvl: 'Highest Liquidity' };
const MIN_TVL_OPTIONS = { '10000': '> $10k', '100000': '> $100k', '1000000': '> $1M' };

// --- Styled Components (iguais a antes) ---
const ControlsContainer = styled.div`
  background-color: #1e293b;
  padding: 1rem;
  border-radius: 0.5rem;
  border: 1px solid #334155;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
const FilterRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
`;
const Label = styled.span`
  font-size: 0.875rem;
  font-weight: 500;
  color: #94a3b8;
`;
const ChainButton = styled.button<{ $active?: boolean }>`
  padding: 0.25rem 0.75rem;
  font-size: 0.875rem;
  border-radius: 9999px;
  transition: all 0.2s;
  border: none;
  cursor: pointer;
  background-color: ${props => props.$active ? '#22d3ee' : '#334155'};
  color: ${props => props.$active ? '#0f172a' : '#f8fafc'};
  font-weight: ${props => props.$active ? 'bold' : 'normal'};

  &:hover {
    background-color: ${props => props.$active ? '#22d3ee' : '#475569'};
  }
`;
const StyledSelect = styled.select`
  background-color: #334155;
  color: #f8fafc;
  border-radius: 0.375rem;
  padding: 0.25rem 0.5rem;
  border: 1px solid #475569;
  font-size: 0.875rem;
`;


// --- Componente Principal ---
export function OpportunityList() {
  const [selectedChain, setSelectedChain] = useState(CHAINS[0]);
  const [sortBy, setSortBy] = useState<'apy' | 'tvl'>('apy');
  const [minTvl, setMinTvl] = useState(10000);

  const { address, isConnected } = useAccount();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (isConnected && address) {
      loginUser(address);
    }
  }, [isConnected, address]);

  const { data: opportunities, isLoading: isLoadingOpportunities, isError } = useQuery({
    queryKey: ['opportunities'],
    queryFn: fetchOpportunities,
  });

  const { data: favoriteIds } = useQuery({
    queryKey: ['favorites', address],
    queryFn: () => fetchFavorites(address!),
    enabled: !!address,
  });

  const toggleFavoriteMutation = useMutation({
    mutationFn: (opportunityId: string) => addFavorite(address!, opportunityId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favorites', address] });
    },
  });

  const processedData = useMemo(() => {
    if (!opportunities) return [];
    return opportunities
      .filter(op => op.chain === selectedChain && op.tvl >= minTvl)
      .sort((a, b) => (sortBy === 'tvl' ? b.tvl - a.tvl : b.apy - a.apy));
  }, [opportunities, selectedChain, minTvl, sortBy]);

  if (isLoadingOpportunities) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {Array.from({ length: 5 }).map((_, i) => (
          <OpportunitySkeleton key={i} />
        ))}
      </div>
    );
  }

  if (isError) {
    return <p style={{ textAlign: 'center', color: '#f43f5e' }}>Failed to fetch opportunities.</p>;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <ControlsContainer>
        <FilterRow>
          <Label>Network:</Label>
          {CHAINS.map(chain => (
            <ChainButton key={chain} onClick={() => setSelectedChain(chain)} $active={selectedChain === chain}>
              {chain}
            </ChainButton>
          ))}
        </FilterRow>
        <FilterRow>
          <Label>Sort by:</Label>
          <StyledSelect onChange={(e) => setSortBy(e.target.value as 'apy' | 'tvl')} value={sortBy}>
            <option value="apy">{SORT_OPTIONS.apy}</option>
            <option value="tvl">{SORT_OPTIONS.tvl}</option>
          </StyledSelect>
          <Label>Min. TVL:</Label>
          <StyledSelect onChange={(e) => setMinTvl(Number(e.target.value))} value={minTvl}>
            {Object.entries(MIN_TVL_OPTIONS).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </StyledSelect>
        </FilterRow>
      </ControlsContainer>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {processedData.length > 0 ? (
          processedData.map(op => (
            <OpportunityCard
              key={op.id}
              opportunity={op}
              isConnected={isConnected}
              isFavorite={favoriteIds?.includes(op.id) ?? false}
              onToggleFavorite={() => toggleFavoriteMutation.mutate(op.id)}
            />
          ))
        ) : (
          <p style={{ textAlign: 'center', color: '#94a3b8', padding: '2rem 0' }}>No opportunities found with these filters.</p>
        )}
      </div>
    </div>
  );
}
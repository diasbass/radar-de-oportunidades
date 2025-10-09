import { useState, useMemo, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAccount } from "wagmi";
import styled from "styled-components";
import { OpportunityCard } from "./OpportunityCard";
import { OpportunitySkeleton } from "./OpportunitySkeleton";
import { CreateAlertModal } from "./CreateAlertModal";
import {
  fetchOpportunities,
  fetchFavorites,
  toggleFavorite, // Alterado aqui
  loginUser,
  createAlert,
  fetchAlerts,
  deleteAlert,
  Opportunity,
  User,
} from "../services/api";

// --- Constantes ---
const CHAINS = ["Polygon", "Arbitrum", "Optimism", "Base"];
const SORT_OPTIONS = { apy: "Highest APY", tvl: "Highest Liquidity" };
const MIN_TVL_OPTIONS = {
  "10000": "> $10k",
  "100000": "> $100k",
  "1000000": "> $1M",
};

// --- Styled Components ---
const ControlsContainer = styled.div`
  background-color: #1e293b;
  padding: 1rem;
  border-radius: 0.75rem;
  border: 1px solid #334155;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
const FilterRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
`;
const FilterGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;
const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  color: #94a3b8;
`;
const ChainButton = styled.button<{ $active?: boolean }>`
  padding: 0.375rem 1rem;
  font-size: 0.875rem;
  border-radius: 9999px;
  transition: all 0.2s;
  border: 1px solid transparent;
  cursor: pointer;
  background-color: ${(props) => (props.$active ? "#22d3ee" : "transparent")};
  color: ${(props) => (props.$active ? "#0f172a" : "#cbd5e1")};
  font-weight: ${(props) => (props.$active ? "bold" : "500")};
  border-color: ${(props) => (props.$active ? "#22d3ee" : "#475569")};

  &:hover {
    border-color: #22d3ee;
    color: white;
  }
`;
const StyledSelect = styled.select`
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-color: #334155;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%239ca3af' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
  background-position: right 0.5rem center;
  background-repeat: no-repeat;
  background-size: 1.5em 1.5em;
  color: #f8fafc;
  border-radius: 0.5rem;
  padding: 0.5rem 2.5rem 0.5rem 0.75rem;
  border: 1px solid #475569;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    border-color: #64748b;
  }
`;
const Title = styled.h3`
  margin: 0;
  font-size: 1.125rem;
  font-weight: bold;
`;
const AlertItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  border-bottom: 1px solid #334155;
  &:last-child {
    border-bottom: none;
  }
`;
const DeleteButton = styled.button`
  background-color: #be123c;
  color: white;
  border: none;
  border-radius: 0.375rem;
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
  cursor: pointer;
  opacity: 0.8;
  transition: opacity 0.2s;
  &:hover {
    opacity: 1;
  }
`;


// --- Componente do Painel de Alertas ---
function AlertsDashboard({ opportunities }: { opportunities: Opportunity[] | undefined }) {
    const { address, isConnected } = useAccount();
    const queryClient = useQueryClient();

    const { data: alerts, isLoading } = useQuery({
        queryKey: ['alerts', address],
        queryFn: () => fetchAlerts(address!),
        enabled: !!address,
    });

    const deleteAlertMutation = useMutation({
        mutationFn: (alertId: string) => deleteAlert(address!, alertId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['alerts', address] });
        },
    });

    if (!isConnected || isLoading || !alerts || alerts.length === 0 || !opportunities) {
        return null;
    }

    return (
        <ControlsContainer>
            <Title>Your Active Alerts</Title>
            {alerts.map((alert) => {
                const opportunity = opportunities.find(op => op.id === alert.opportunityId);
                const projectName = opportunity ? opportunity.project : alert.opportunityId.split('-')[0];
                
                return (
                    <AlertItem key={alert.id}>
                        <span>
                            Notify when <strong>{projectName}</strong> is &gt; <strong>{alert.targetApy}%</strong>
                        </span>
                        <DeleteButton onClick={() => deleteAlertMutation.mutate(alert.id)}>
                            Delete
                        </DeleteButton>
                    </AlertItem>
                );
            })}
        </ControlsContainer>
    );
}

// --- Componente Principal ---
export function OpportunityList({ user }: { user: User | undefined }) {
  const [selectedChain, setSelectedChain] = useState("Polygon");
  const [sortBy, setSortBy] = useState<"apy" | "tvl">("apy");
  const [minTvl, setMinTvl] = useState(10000);
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    opportunity: Opportunity | null;
  }>({
    isOpen: false,
    opportunity: null,
  });

  const { address, isConnected } = useAccount();
  const queryClient = useQueryClient();

  const isPro = user?.subscriptionStatus === 'PRO';

  useEffect(() => {
    if (isConnected && address) {
      loginUser(address);
    }
  }, [isConnected, address]);

  const {
    data: opportunities,
    isLoading: isLoadingOpportunities,
    isError,
  } = useQuery({
    queryKey: ["opportunities"],
    queryFn: fetchOpportunities,
  });

  const { data: favoriteIds } = useQuery({
    queryKey: ["favorites", address],
    queryFn: () => fetchFavorites(address!),
    enabled: !!address && isPro,
  });

  const toggleFavoriteMutation = useMutation({
    mutationFn: (opportunityId: string) => {
      return toggleFavorite(address!, opportunityId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites", address] });
    },
  });

  const createAlertMutation = useMutation({
    mutationFn: (variables: { opportunityId: string; targetApy: number }) => {
      return createAlert(address!, variables.opportunityId, variables.targetApy);
    },
    onSuccess: () => {
      alert("Alert created successfully!");
      setModalState({ isOpen: false, opportunity: null });
      queryClient.invalidateQueries({ queryKey: ['alerts', address] });
    },
    onError: () => {
      alert("Failed to create alert. Do you already have an alert for this opportunity?");
    },
  });

  const processedData = useMemo(() => {
    if (!opportunities) return [];
    return opportunities
      .filter((op) => op.chain === selectedChain && op.tvl >= minTvl)
      .sort((a, b) => (sortBy === "tvl" ? b.tvl - a.tvl : b.apy - a.apy));
  }, [opportunities, selectedChain, minTvl, sortBy]);

  if (isLoadingOpportunities) {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {Array.from({ length: 5 }).map((_, i) => (
          <OpportunitySkeleton key={i} />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <p style={{ textAlign: "center", color: "#f43f5e" }}>
        Failed to fetch opportunities.
      </p>
    );
  }

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        {isPro && <AlertsDashboard opportunities={opportunities} />}
        <ControlsContainer>
          <FilterRow data-section="section_network-filter">
            <Label>Network:</Label>
            {CHAINS.map((chain) => (
              <ChainButton
                key={chain}
                onClick={() => setSelectedChain(chain)}
                $active={selectedChain === chain}
                data-element={`button_${chain.toLowerCase()}`}
              >
                {chain}
              </ChainButton>
            ))}
          </FilterRow>
          <FilterRow>
            <FilterGroup>
              <Label htmlFor="sort-by">Sort by:</Label>
              <StyledSelect
                id="sort-by"
                onChange={(e) => setSortBy(e.target.value as "apy" | "tvl")}
                value={sortBy}
              >
                <option value="apy">{SORT_OPTIONS.apy}</option>
                <option value="tvl">{SORT_OPTIONS.tvl}</option>
              </StyledSelect>
            </FilterGroup>
            <FilterGroup>
              <Label htmlFor="min-tvl">Min. TVL:</Label>
              <StyledSelect
                id="min-tvl"
                onChange={(e) => setMinTvl(Number(e.target.value))}
                value={minTvl}
              >
                {Object.entries(MIN_TVL_OPTIONS).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </StyledSelect>
            </FilterGroup>
          </FilterRow>
        </ControlsContainer>

        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {processedData.length > 0 ? (
            processedData.map((op) => (
              <OpportunityCard
                key={op.id}
                opportunity={op}
                isConnected={isConnected}
                isPro={isPro}
                isFavorite={favoriteIds?.includes(op.id) ?? false}
                onToggleFavorite={() => toggleFavoriteMutation.mutate(op.id)}
                onOpenAlertModal={() =>
                  setModalState({ isOpen: true, opportunity: op })
                }
              />
            ))
          ) : (
            <p
              style={{ textAlign: "center", color: "#94a3b8", padding: "2rem 0" }}
            >
              No opportunities found with these filters.
            </p>
          )}
        </div>
      </div>

      {modalState.isOpen && (
        <CreateAlertModal
          isOpen={modalState.isOpen}
          opportunity={modalState.opportunity!}
          onClose={() => setModalState({ isOpen: false, opportunity: null })}
          onCreate={(targetApy) => {
            if (modalState.opportunity) {
              createAlertMutation.mutate({
                opportunityId: modalState.opportunity.id,
                targetApy,
              });
            }
          }}
        />
      )}
    </>
  );
}
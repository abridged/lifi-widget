import { useNavigate } from 'react-router-dom';
import { navigationRoutes } from '../../utils';
import { useState } from 'react';
import { balance, chains } from './constant';
import { ChainCard } from '../../components/ChainCard';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import { formatUnits } from 'viem';

export const TokenHoldingContainer = styled(Box)(({ theme }) => ({
  padding: '14px',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: '#232323',
  gap: '20px',
}));

export const TokenHoldingsPage: React.FC = () => {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState<string | undefined>('1');

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : undefined);
    };
  const handleCardClick = () => {
    navigate(navigationRoutes.bridgeHome);
  };

  const chainWithBalance = chains.map((chain) => {
    const balanceObj = balance.balances.find(
      (c) => `${c.chainId}` === chain.id,
    );
    if (balanceObj) {
      chain.nativeToken.balance = formatUnits(BigInt(balanceObj.balance), 18);
    }
    return chain;
  });
  return (
    <TokenHoldingContainer>
      {chainWithBalance.map((chain) => (
        <ChainCard
          key={chain.id}
          chain={chain}
          expanded={expanded}
          handleExpandChange={handleChange}
          onSubmit={(value, chain) => {
            console.log(value, chain);
          }}
        />
      ))}
      <button onClick={handleCardClick}>Bridge</button>
    </TokenHoldingContainer>
  );
};

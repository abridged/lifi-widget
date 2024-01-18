import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Alert, Box, CircularProgress } from '@mui/material';
// import { Mixpanel } from './mixpanel';
import { AdvanceOptions } from './components/AdvanceOptions';
import { Assets } from './components/Assests';
import { ErrorMessage } from './components/ErrorMessage';
import { useCollabUser } from '../../hooks/useCollabUser';
import { Chain } from '../../types/types';
import { ethers } from 'ethers';
import { getQuote } from '../../utils/apis';
import { formatUnits } from 'viem';
import TransactionDialog from './components/TransactionDialog';

export const TokenHoldingContainer = styled(Box)(({ theme }) => ({
  padding: '14px',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: '#232323',
  gap: '20px',
}));

export const TokenHoldingsPage: React.FC = () => {
  const {
    pkpAddr,
    account,
    toSmartAccount,
    assets,
    error: getUserInfoError,
  } = useCollabUser();
  const [error, setError] = useState<string | undefined>(undefined);
  const [transferRequest, setTransferRequest] = useState<
    | {
        chain: Chain;
        amount: string;
        toSmartAccount: string;
        quote?: any;
      }
    | undefined
  >(undefined);

  const onSubmit = async (amount: string, chain: Chain) => {
    const ethersVal = ethers.utils.parseEther(amount);
    const isBridgeTransaction = chain.id !== 42161;
    let quote: any;
    if (isBridgeTransaction) {
      quote = await getQuote(
        chain.chainName,
        chain.tokenName,
        ethersVal.toString(),
        pkpAddr!,
      );
    }
    const balance = chain.nativeToken.balance;
    if (isBridgeTransaction) {
      const total =
        Number(quote.estimate.gasCosts[0].amount) +
        Number(quote.action.fromAmount);
      const balanceCheck =
        balance && Number(formatUnits(BigInt(total), 18)) < Number(balance);
      if (!balanceCheck) {
        setError(`Amount: ${ethers.utils.formatEther(quote.action.fromAmount)}. Gas fee:
            ${ethers.utils.formatEther(quote.estimate.gasCosts[0].amount)}. Total
            required: ${formatUnits(BigInt(total), 18)}`);
        return;
      }
    } else {
      const balanceCheck =
        Number(balance) > Number(amount) + 0.0005 && toSmartAccount;
      if (!balanceCheck) {
        setError(`Please save a little amount for gas fee (0.0005 ETH)`);
        return;
      }
    }
    setTransferRequest({
      amount,
      chain,
      // @ts-ignore
      toSmartAccount,
      quote,
    });
  };

  return (
    <TokenHoldingContainer>
      {!!transferRequest && (
        <TransactionDialog
          {...transferRequest}
          onError={(error) => {
            setTransferRequest(undefined);
            setError(error);
          }}
        />
      )}
      {account.isConnected ? (
        getUserInfoError ? (
          <Alert variant="filled" severity="error">
            {getUserInfoError}
          </Alert>
        ) : (
          <>
            {error && (
              <ErrorMessage
                error={error}
                onClose={() => {
                  setError(undefined);
                }}
              />
            )}
            {assets ? (
              <Assets assets={assets} onSubmit={onSubmit} />
            ) : (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  minHeight: '100px',
                  alignItems: 'center',
                }}
              >
                <CircularProgress color={'inherit'} />
              </Box>
            )}
            <AdvanceOptions />
          </>
        )
      ) : (
        <Alert variant="filled" severity="warning">
          {' '}
          Connect wallet first
        </Alert>
      )}
    </TokenHoldingContainer>
  );
};

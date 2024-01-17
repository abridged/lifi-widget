import { useNavigate, useSearchParams } from 'react-router-dom';
import { navigationRoutes } from '../../utils';
import { useEffect, useState } from 'react';
import { balance, chains } from './constant';
import { ChainCard } from '../../components/ChainCard';
import { styled } from '@mui/material/styles';
import { Box, Button } from '@mui/material';
import { formatUnits } from 'viem';
import { type Chain } from '../../components/ChainCard/types';
import { useAccount } from '../../hooks';
// import { Mixpanel } from './mixpanel';
import { ethers } from 'ethers';
import { useConfig } from 'wagmi';
import { getWalletClient, switchChain } from '@wagmi/core';
import { getUserProfile, getUserSmartAccount } from './apis';
import { LoadingIndicator } from './LoadingIndicator';

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
  const [searchParams, setSearchParams] = useSearchParams();
  const [userId, setUserId] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [toSmartAccount, setSmartAccount] = useState<string>();
  const [pkpAddr, setPkpAddress] = useState<string>();
  const accessToken = searchParams.get('access_token');
  const { account } = useAccount();
  const wagmiConfig = useConfig();

  useEffect(() => {
    async function fetchMyAPI(accessToken: string) {
      try {
        const userProfile = await getUserProfile(accessToken);
        const smartAccountRes = await getUserSmartAccount(accessToken);
        setUserId(userProfile.id);
        setSmartAccount(smartAccountRes.smartAccount);
        setPkpAddress(smartAccountRes.account);
        console.log(smartAccountRes);
        setIsLoading(false);

        // const id = `TEL#USER#${userProfile.id}`;
        // TODO: enable mixpanel
        // Mixpanel.register({
        //   userId: id,
        // });
        // if (id) {
        //   Mixpanel.identify(id);
        // }
        // Mixpanel.people.union({
        //   userInfo: userProfile,
        // });

        // Mixpanel.people.set({
        //   smartAccount: smartAccountRes.account,
        // });

        // Mixpanel.track('mem_lifi_widget_loaded', {
        //   userId: userProfile.id,
        //   smartAccount: smartAccountRes.account,
        // });
      } catch (e) {
        console.error('session expired');
        setIsLoading(false);
      }
    }
    // FIX: not getting  the token
    const accessToken = 'OqDZr3Gsyvmg1YkfpxcfJ'; //searchParams.get('access_token');
    if (accessToken) {
      fetchMyAPI(accessToken);
    } else {
      setIsLoading(false);
    }
  }, []);

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

  const transferFund = async (amount: string, balance?: string) => {
    const currentChain = account.chainId;
    let client;
    if (currentChain !== 42161) {
      const chain = await switchChain(wagmiConfig, { chainId: 42161 });
      client = await getWalletClient(wagmiConfig, { chainId: chain.id });
    } else {
      client = await getWalletClient(wagmiConfig);
    }
    if (Number(balance) < Number(amount) + 0.0008 && toSmartAccount) {
      try {
        const tx = await client.sendTransaction({
          // @ts-ignore: Unreachable code error
          to: toSmartAccount,
          value: ethers.utils.parseEther(amount).toBigInt(),
          data: '0x',
        });
        // TODO: show a tx finished popup as this would take a few secs
        // await tx.wait();
      } catch (e) {
        console.error(e);
        // TODO
        // send insufficient fund warning/error
      }
    } else {
      // TODO
      // send insufficient fund warning/error
    }
  };

  const getQuote = async (
    fromChain: string,
    fromToken: string,
    fromAmount: string,
    fromAddress: string,
  ) => {
    const params = new URLSearchParams({
      fromChain,
      toChain: 'arb',
      fromToken,
      toToken: 'ETH',
      fromAmount,
      fromAddress,
    });
    const result = await fetch(`https://li.quest/v1/quote?${params}`);
    const data = await result.json();
    return data;
  };

  const bridgeFund = async (
    value: string,
    chain: Chain,
    accountAddr: string,
    balance?: string,
  ) => {
    const ethersVal = ethers.utils.parseEther(value);
    const quote = await getQuote(
      chain.chainName,
      chain.tokenName,
      ethersVal.toString(),
      accountAddr,
    );
    console.log(quote);

    const total =
      Number(quote.estimate.gasCosts[0].amount) +
      Number(quote.action.fromAmount);
    console.log(total);
    const currentChain = account.chainId;
    let client;
    if (currentChain !== Number(chain.id)) {
      const targetChain = await switchChain(wagmiConfig, {
        chainId: Number(chain.id),
      });
      client = await getWalletClient(wagmiConfig, { chainId: targetChain.id });
    } else {
      client = await getWalletClient(wagmiConfig);
    }
    if (balance && Number(formatUnits(BigInt(total), 18)) < Number(balance)) {
      try {
        const tx = await client.sendTransaction(quote.transactionRequest);
        //TODO:
        // show a popup to indicate how long this will take
        // this is under quote.estimate.executionDuration
      } catch (e) {
        console.error(e);
        // TODO
        // send insufficient fund warning/error
      }
    } else {
      //   // TODO
      //   // send insufficient fund warning/error
    }
    // await tx.wait();
  };
  return (
    <>
      {isLoading ? (
        <LoadingIndicator />
      ) : (
        <>
          {account.isConnected ? (
            <TokenHoldingContainer>
              {chainWithBalance.map((chain) => (
                <ChainCard
                  key={chain.id}
                  chain={chain}
                  expanded={expanded}
                  handleExpandChange={handleChange}
                  onSubmit={(value, chain) => {
                    if (chain.id === '42161') {
                      transferFund(value);
                    } else {
                      // bridge to eoa
                      // if (pkpAddr) {
                      bridgeFund(
                        value,
                        chain,
                        pkpAddr!,
                        chain.nativeToken.balance,
                      );
                      // }
                    }
                  }}
                />
              ))}
              <Button
                style={{
                  borderRadius: '24px',
                  backgroundColor: '#EDC803',
                  color: 'black',
                  fontWeight: 700,
                  height: '32px',
                }}
                onClick={handleCardClick}
                variant="contained"
              >
                Bridge
              </Button>
            </TokenHoldingContainer>
          ) : (
            <div>Connect wallet first</div>
          )}
        </>
      )}
    </>
  );
};

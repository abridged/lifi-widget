import { useNavigate } from 'react-router-dom';
import { navigationRoutes } from '../../utils';
import React, { ReactNode, useEffect, useState } from 'react';
import { balance, chains } from './constant';
import { ChainCard } from '../../components/ChainCard';
import { styled } from '@mui/material/styles';
import { Box, Button } from '@mui/material';
import { formatUnits } from 'viem';
import {
  Balance,
  type Chain,
  EthereumAsset,
} from '../../components/ChainCard/types';
import { useAccount } from '../../hooks';
// import { Mixpanel } from './mixpanel';
import { ethers } from 'ethers';
import { useConfig } from 'wagmi';
import { getWalletClient, switchChain } from '@wagmi/core';
import {
  getBalance,
  getUserProfile,
  getUserSmartAccount,
  submitTxWaitJob,
} from './apis';
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
  const [expanded, setExpanded] = useState<number | undefined>(42161);
  const [userId, setUserId] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [toSmartAccount, setSmartAccount] = useState<string>();
  const [chainWithBalance, setChainWithBalance] = useState<Chain[] | undefined>(
    undefined,
  );
  const [pkpAddr, setPkpAddress] = useState<string>();
  const [showInsufficientModal, setShowInsufficientModal] =
    useState<boolean>(false);
  const [insufficientModalContent, setInsufficientModalContent] =
    useState<ReactNode>(<></>);
  const [showTxModal, setTxModal] = useState<boolean>(false);
  const [modalLoading, setModalLoading] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<ReactNode>(<></>);
  const accessToken = localStorage.getItem('accessToken');
  const { account } = useAccount();
  const wagmiConfig = useConfig();
  useEffect(() => {
    async function fetchMyAPI(accessToken: string, eoaAddr: string) {
      try {
        const userProfile = await getUserProfile(accessToken);
        const smartAccountRes = await getUserSmartAccount(accessToken);
        const balanceResponse = await getBalance(accessToken, {
          account: eoaAddr,
          assets: chains.map((chain) => {
            return {
              chainId: chain.id,
            } as EthereumAsset;
          }),
        });
        const cwb: Chain[] = [];
        chains.forEach((chain) => {
          const balanceObj = balanceResponse.balances.find(
            (c: Balance) => c.chainId === chain.id,
          );
          if (balanceObj && balanceObj.balance !== '0') {
            chain.nativeToken.balanceInBigInt = balanceObj.balance;
            chain.nativeToken.balance = formatUnits(
              BigInt(balanceObj.balance),
              18,
            );
            cwb.push(chain);
          }
        }),
          console.log(cwb);
        setChainWithBalance(cwb);
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

    if (accessToken && account.address) {
      fetchMyAPI(accessToken, account.address);
    } else {
      setIsLoading(false);
    }
  }, [account.address]);

  const handleChange =
    (panel: number) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : undefined);
    };
  const handleBridgeClick = () => {
    navigate(navigationRoutes.bridgeHome);
  };

  const arbTransfer = async (
    amount: string,
    accessToken: string,
    balance?: string,
  ) => {
    const currentChain = account.chainId;
    let client;
    console.log(Number(balance) < Number(amount) + 0.0005);
    console.log(Number(amount) + 0.0005, toSmartAccount);
    if (Number(balance) > Number(amount) + 0.0005 && toSmartAccount) {
      if (currentChain !== 42161) {
        const chain = await switchChain(wagmiConfig, { chainId: 42161 });
        client = await getWalletClient(wagmiConfig, { chainId: chain.id });
      } else {
        client = await getWalletClient(wagmiConfig);
      }
      try {
        const tx = await client.sendTransaction({
          // @ts-ignore: Unreachable code error
          to: toSmartAccount,
          value: ethers.utils.parseEther(amount).toBigInt(),
          data: '0x',
        });
        console.log(tx);
        // TODO await tx.wait();
        // sample tx hash: 0xdfcb70cfa9a285c5bce68339fab375cdf054c5d8249f3466986b6f3ae8bfa492

        setModalContent(
          <div>
            Success!
            <div>
              Transfer complete of Arbitrum ETH to your Telefrens account is
              complete!{' '}
              <a href={`"https://arbiscan.io/tx/${tx}"`} target="_blank">
                view tx
              </a>
            </div>
          </div>,
        );
        setTxModal(true);
      } catch (e) {
        console.error(e);
        // TODO
        // send insufficient fund warning/error
      }
    } else {
      setShowInsufficientModal(true);
      setInsufficientModalContent(
        <div>Please save a little amount for gas fee (0.0005 ETH)</div>,
      );
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
    accessToken: string,
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

    if (balance && Number(formatUnits(BigInt(total), 18)) < Number(balance)) {
      let client;
      if (currentChain !== Number(chain.id)) {
        const targetChain = await switchChain(wagmiConfig, {
          chainId: Number(chain.id),
        });
        client = await getWalletClient(wagmiConfig, {
          chainId: targetChain.id,
        });
      } else {
        client = await getWalletClient(wagmiConfig);
      }
      try {
        const tx = await client.sendTransaction(quote.transactionRequest);
        // sample data
        // console.log({
        //   toChain: '42161',
        //   fromChain: '137',
        //   txHash:
        //     '0x7d74e4006b1c4626687a57326d35cc6dcfc47ad37fc33c61c465c76a4769d677',
        //   bridge: 'hop',
        // });
        await submitTxWaitJob(accessToken, {
          fromChain: quote.action.fromChainId.toString(),
          toChain: quote.action.toChainId.toString(),
          bridge: quote.estimate.tool,
          txHash: tx,
        });
        setModalContent(
          <div>
            Converting your selections to Arbitrum ETH and transferring to your
            Telefrens account
            <a href={`"https://arbiscan.io/tx/${tx}"`} target="_blank">
              view transaction hash
            </a>
            <div>Estimate time: {quote.estimate.executionDuration} seconds</div>
            <div>
              No need to wait: The bot will message you when this transaction is
              complete.
            </div>
          </div>,
        );
        setTxModal(true);
        //TODO:
        // show a popup to indicate how long this will take
        // this is under quote.estimate.executionDuration
      } catch (e) {
        console.error(e);
        // TODO
        // send insufficient fund warning/error
      }
    } else {
      setShowInsufficientModal(true);
      setInsufficientModalContent(
        <div>
          Amount: {ethers.utils.formatEther(quote.action.fromAmount)}. Gas fee:{' '}
          {ethers.utils.formatEther(quote.estimate.gasCosts[0].amount)}. Total
          required: {formatUnits(BigInt(total), 18)}
        </div>,
      );
    }
    // await tx.wait();
  };
  return (
    <>
      {isLoading ? (
        <LoadingIndicator />
      ) : (
        <>
          {account.isConnected && chainWithBalance ? (
            <TokenHoldingContainer>
              {/* insufficientModal */}
              <div
                style={{
                  backgroundColor: '#ffcccc',
                  color: '#cc0000',
                  padding: '10px 100px',
                  zIndex: '3',
                  display: `${showInsufficientModal ? 'block' : 'none'}`,
                  fontSize: '16px',
                }}
              >
                Insufficient balance: not enough for amount and gas fee.
                <br />
                {insufficientModalContent}
                <button
                  onClick={() => {
                    setShowInsufficientModal(false);
                  }}
                >
                  ok
                </button>
              </div>
              <div
                style={{
                  height: '100%',
                  backgroundColor: 'rgb(40,40,40)',
                  padding: '10px 100px',
                  zIndex: '1',
                  borderStyle: 'solid',
                  borderColor: '#949494',
                  fontSize: '16px',
                  display: `${showTxModal ? 'block' : 'none'}`,
                }}
              >
                {modalLoading ? (
                  <div>Loading</div>
                ) : (
                  <>
                    <div>{modalContent}</div>
                    <button
                      onClick={() => {
                        setTxModal(false);
                      }}
                    >
                      Return to Telefrens
                    </button>
                  </>
                )}
              </div>
              {chainWithBalance.map((chain) => (
                <ChainCard
                  key={chain.id}
                  chain={chain}
                  expanded={expanded}
                  handleExpandChange={handleChange}
                  onSubmit={(value, chain) => {
                    if (accessToken) {
                      if (chain.id === 42161) {
                        arbTransfer(
                          value,
                          accessToken,
                          chain.nativeToken.balance,
                        );
                      } else {
                        // bridge to eoa
                        // if (pkpAddr) {
                        bridgeFund(
                          accessToken,
                          value,
                          chain,
                          pkpAddr!,
                          chain.nativeToken.balance,
                        );
                        // }
                      }
                    } else {
                      alert('session expired!');
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
                onClick={handleBridgeClick}
                variant="contained"
              >
                Bridge
              </Button>
            </TokenHoldingContainer>
          ) : (
            <div
              style={{
                textAlign: 'center',
                width: '100%',
                fontWeight: 700,
              }}
            >
              Connect wallet first
            </div>
          )}
        </>
      )}
    </>
  );
};

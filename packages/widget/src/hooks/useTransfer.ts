import { getWalletClient, switchChain } from '@wagmi/core';
import { ethers } from 'ethers';
import { submitTxWaitJob, waitForTx } from '..//utils/apis';
import { Chain } from '../types/types';
import { useState } from 'react';
import { useAccount } from '@collabland/lifi-widget';
import { useConfig } from 'wagmi';

export enum TransactionStatus {
  NOT_STARTED,
  WAITING_TO_SWITCH,
  WAITING_TO_SIGN,
  WAITING_TO_COMPLETE,
  COMPLETED,
  FAILED,
}

export const useTransfer = () => {
  const { account } = useAccount();
  const wagmiConfig = useConfig();
  const [tx, setTx] = useState<string | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<TransactionStatus>(
    TransactionStatus.NOT_STARTED,
  );

  const transfer = async (
    chain: Chain,
    amount: string,
    toSmartAccount: string,
    quote?: any,
  ) => {
    setIsLoading(true);
    const ethersVal = ethers.utils.parseEther(amount);
    const currentChain = account.chainId;
    let client;
    if (currentChain !== Number(chain.id)) {
      setStatus(TransactionStatus.WAITING_TO_SWITCH);
      const targetChain = await switchChain(wagmiConfig, {
        chainId: Number(chain.id),
      });
      client = await getWalletClient(wagmiConfig, {
        chainId: targetChain.id,
      });
    } else {
      client = await getWalletClient(wagmiConfig);
    }
    setStatus(TransactionStatus.WAITING_TO_SIGN);
    try {
      const tx = await client.sendTransaction(
        quote
          ? quote.transactionRequest
          : {
              to: toSmartAccount,
              value: ethersVal.toBigInt(),
              data: '0x',
            },
      );
      setTx(tx);
      if (quote) {
        await submitTxWaitJob({
          fromChain: quote.action.fromChainId.toString(),
          toChain: quote.action.toChainId.toString(),
          bridge: quote.estimate.tool,
          txHash: tx,
        });
      }
      setStatus(TransactionStatus.WAITING_TO_COMPLETE);
      await waitForTx({
        chainId: `${chain.id}`,
        txHash: `${tx}`,
      });
      setStatus(TransactionStatus.COMPLETED);
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      setStatus(TransactionStatus.FAILED);
      console.error(e);
      // @ts-ignore
      setError(e.details ?? e.message);
    }
  };
  return {
    error,
    tx,
    isLoading,
    status,
    transfer,
  };
};

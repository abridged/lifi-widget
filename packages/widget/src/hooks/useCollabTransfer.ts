import { getWalletClient, switchChain } from '@wagmi/core';
import { useState } from 'react';
import { useAccount } from '@collabland/lifi-widget';
import { useConfig } from 'wagmi';
import { arbitrum } from 'viem/chains';
import { waitForTransaction } from '../utils/apis';

export enum TransactionStatus {
  NOT_STARTED,
  WAITING_TO_SWITCH,
  WAITING_TO_SIGN,
  WAITING_TO_COMPLETE,
  COMPLETED,
  FAILED,
}

export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const waitForStatus = async (chainId: string, hash: string) => {
  let complete:
    | {
        success: boolean;
        link: string;
      }
    | undefined;
  do {
    const receipt = await waitForTransaction(chainId, hash);
    if (receipt?.success) {
      complete = receipt;
    }
    await delay(2000);
  } while (!complete);
  return complete;
};

export const useCollabTransfer = () => {
  const { account } = useAccount();
  const wagmiConfig = useConfig();
  const [tx, setTx] = useState<string | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<TransactionStatus>(
    TransactionStatus.NOT_STARTED,
  );

  const DefaultChain = arbitrum.id;

  const transfer = async (
    transactionRequest: any,
  ): Promise<{
    status: TransactionStatus;
    tx?: string;
    chainId?: number;
    link?: string;
  }> => {
    setIsLoading(true);
    setStatus(TransactionStatus.NOT_STARTED);
    const currentChain = account.chainId;
    let client;
    if (currentChain !== DefaultChain) {
      setStatus(TransactionStatus.WAITING_TO_SWITCH);
      const targetChain = await switchChain(wagmiConfig, {
        chainId: DefaultChain,
      });
      console.log(targetChain);
      client = await getWalletClient(wagmiConfig, {
        chainId: targetChain.id,
      });
    } else {
      client = await getWalletClient(wagmiConfig);
    }
    setStatus(TransactionStatus.WAITING_TO_SIGN);
    try {
      const txHash = await client.sendTransaction(transactionRequest);
      setTx(txHash);
      setStatus(TransactionStatus.WAITING_TO_COMPLETE);
      const receipt = await waitForStatus('arbitrum', txHash);
      if (receipt.success) {
        setStatus(TransactionStatus.COMPLETED);
        setIsLoading(false);
        return {
          status: TransactionStatus.COMPLETED,
          tx: txHash,
          chainId: DefaultChain,
          link: receipt.link,
        };
      } else {
        setIsLoading(false);
        setStatus(TransactionStatus.FAILED);
        setError('Error in getting transaction on provider');
        return {
          status: TransactionStatus.FAILED,
        };
      }
    } catch (e) {
      setIsLoading(false);
      setStatus(TransactionStatus.FAILED);
      console.error(e);
      // @ts-ignore
      setError(e.details ?? e.message);
      return {
        status: TransactionStatus.FAILED,
      };
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

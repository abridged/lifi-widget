import { EthereumBalanceRequest } from '../types/types';
import httpClient from './httpClient';
import { BigNumber } from 'ethers';

export function getUserProfile() {
  return httpClient(`account/me`);
}

export function getUserSmartAccount() {
  return httpClient(`telefrens/me/account?chainId=42161`);
}

export function getBalance(request: EthereumBalanceRequest) {
  return httpClient(`ethereum/asset-balances`, {
    method: 'POST',
    body: JSON.stringify(request),
  });
}

export function transferFund() {
  return httpClient(`telefrens/me/fund-account`, {
    method: 'post',
  });
}

export function submitTxWaitJob(txObj: {
  txHash: string;
  fromChain: string;
  bridge?: string;
  toChain?: string;
}) {
  return httpClient(`telefrens/lifi-widget/submit`, {
    method: 'POST',
    body: JSON.stringify(txObj),
  });
}
export interface TransactionReceipt {
  to: string;
  from: string;
  contractAddress: string;
  transactionIndex: number;
  root?: string;
  gasUsed: BigNumber;
  logsBloom: string;
  blockHash: string;
  transactionHash: string;
  blockNumber: number;
  confirmations: number;
  cumulativeGasUsed: BigNumber;
  effectiveGasPrice: BigNumber;
  byzantium: boolean;
  type: number;
  status?: number;
}
export async function waitForTx(txObj: {
  chainId: string;
  txHash: string;
}): Promise<TransactionReceipt> {
  return httpClient(`telefrens/lifi-widget/wait-tx`, {
    method: 'post',
    body: JSON.stringify(txObj),
  });
}

export const getArbBalance = () => {
  return httpClient(`telefrens/get-account-balance`);
};

export const getQuote = async (
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

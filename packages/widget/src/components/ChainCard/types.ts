import { SyntheticEvent } from 'react';

export type Token = {
  name: string;
  symbol: string;
  image: string;
  decimal?: number;
  balance?: string;
};

export type Chain = {
  isRecommended?: boolean;
  id: number;
  name: string;
  chainName: string;
  tokenName: string;
  image: string;
  nativeToken: Token;
};

export type Balance = {
  balance: string;
  chainId: number;
  token: string;
};

export type ChainCardProps = {
  onSubmit: (value: string, chain: Chain) => void;
  chain: Chain;
  expanded?: number;
  handleExpandChange: (
    panel: number,
  ) => (event: SyntheticEvent<Element, Event>, expanded: boolean) => void;
};

export type EthereumAsset = {
  chainId: number;
  token?: string;
};

export type EthereumBalanceRequest = {
  account: string;
  assets: EthereumAsset[];
};

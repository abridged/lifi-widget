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
  id: string;
  name: string;
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
  expanded?: string;
  handleExpandChange: (
    panel: string,
  ) => (event: SyntheticEvent<Element, Event>, expanded: boolean) => void;
};

import { Balance, Chain } from '../types/types';

export const chains: Chain[] = [
  {
    isRecommended: true,
    id: 42161,
    name: 'Arbitrum',
    chainName: 'arb',
    tokenName: 'ETH',
    image: 'https://icons.llamao.fi/icons/chains/rsz_arbitrum.jpg',
    transactionLink: 'https://arbiscan.io/tx',
    nativeToken: {
      name: 'Arbitrum ETH',
      image: 'https://icons.llamao.fi/icons/chains/rsz_arbitrum.jpg',
      symbol: 'ETH',
    },
  },
  {
    id: 1,
    name: 'Mainnet',
    chainName: 'eth',
    tokenName: 'ETH',
    image: 'https://icons.llamao.fi/icons/chains/rsz_ethereum.jpg',
    transactionLink: 'https://etherscan.io/tx',
    nativeToken: {
      name: 'Ethereum',
      image: 'https://icons.llamao.fi/icons/chains/rsz_ethereum.jpg',
      symbol: 'ETH',
    },
  },
  {
    id: 137,
    name: 'Polygon',
    chainName: 'pol',
    tokenName: 'MATIC',
    image: 'https://icons.llamao.fi/icons/chains/rsz_polygon.jpg',
    transactionLink: 'https://polygonscan.com/tx',
    nativeToken: {
      name: 'MATIC',
      image: 'https://icons.llamao.fi/icons/chains/rsz_polygon.jpg',
      symbol: 'MATIC',
    },
  },
  {
    id: 10,
    name: 'Optimism',
    chainName: 'opt',
    tokenName: 'ETH',
    image: 'https://icons.llamao.fi/icons/chains/rsz_optimism.jpg',
    transactionLink: 'https://optimistic.etherscan.io/tx',
    nativeToken: {
      name: 'Optimism ETH',
      image: 'https://icons.llamao.fi/icons/chains/rsz_optimism.jpg',
      symbol: 'ETH',
    },
  },
];

export const balance: { balances: Balance[] } = {
  balances: [
    {
      balance: '137186665964285980',
      chainId: 1,
      token: '',
    },
    {
      balance: '3999979000000000000',
      chainId: 137,
      token: '',
    },
    {
      balance: '137186665964285980',
      chainId: 42161,
      token: '',
    },
    {
      balance: '3999979000000000000',
      chainId: 10,
      token: '',
    },
  ],
};

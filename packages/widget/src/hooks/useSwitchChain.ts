import { useAccount } from '../hooks/useAccount';
import { useConfig } from 'wagmi';
import { useEffect, useState } from 'react';
import { arbitrum } from 'viem/chains';
import { switchChain } from '@wagmi/core';

export const useSwitchChain = () => {
  const [loading, setLoading] = useState(false);
  const { account } = useAccount();
  const wagmiConfig = useConfig();

  const DefaultChain = arbitrum.id;

  useEffect(() => {
    if (account.isConnected) {
      const currentChain = account.chainId;
      if (currentChain !== DefaultChain) {
        setLoading(true);
        switchChain(wagmiConfig, {
          chainId: DefaultChain,
        }).then(() => {
          setLoading(false);
        });
      }
    }
  }, [account.isConnected]);

  return { loading };
};

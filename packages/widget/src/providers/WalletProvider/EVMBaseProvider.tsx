import {
  alpha,
  binance,
  bitget,
  bitpie,
  block,
  brave,
  createCoinbaseConnector,
  createWalletConnectConnector,
  dcent,
  exodus,
  frame,
  frontier,
  gate,
  hyperpay,
  imtoken,
  liquality,
  okx,
  oneinch,
  ownbit,
  rabby,
  safepal,
  status,
  taho,
  tokenary,
  tokenpocket,
  trust,
  xdefi,
} from '@collabland/lifi-wallet-management';
import { useMemo, type FC, type PropsWithChildren } from 'react';
import type { Chain } from 'viem';
import { createClient } from 'viem';
import type { CreateConnectorFn } from 'wagmi';
import { WagmiProvider, createConfig, http } from 'wagmi';
import { mainnet } from 'wagmi/chains';
import { defaultWalletConnectProjectId } from '../../config/walletConnect';
import { useAvailableChains } from '../../hooks';
import { LiFiToolLogo } from '../../icons';
import { useWidgetConfig } from '../WidgetProvider';
import { formatChain } from './utils';

const connectors: Record<string, CreateConnectorFn | undefined> = {
  walletConnect: undefined,
  coinbase: undefined,
  bitget,
  gate,
  exodus,
  taho,
  binance,
  frontier,
  okx,
  trust,
  status,
  alpha,
  block,
  bitpie,
  brave,
  dcent,
  frame,
  hyperpay,
  imtoken,
  liquality,
  ownbit,
  tokenpocket,
  xdefi,
  oneinch,
  tokenary,
  safepal,
  rabby,
};

export const EVMBaseProvider: FC<PropsWithChildren> = ({ children }) => {
  const { walletConfig } = useWidgetConfig();
  const { chains } = useAvailableChains();

  const wagmiConfig = useMemo(() => {
    const _chains: [Chain, ...Chain[]] = chains?.length
      ? (chains.map(formatChain) as [Chain, ...Chain[]])
      : [mainnet];
    // Add ENS contracts
    const _mainnet = _chains.find((chain) => chain.id === mainnet.id);
    if (_mainnet) {
      _mainnet.contracts = mainnet.contracts;
    }

    if (!connectors['walletConnect']) {
      const params = walletConfig?.walletConnect ?? {
        projectId: defaultWalletConnectProjectId,
      };
      connectors['walletConnect'] = createWalletConnectConnector(params);
    }
    if (!connectors['coinbase']) {
      const params = walletConfig?.coinbase ?? {
        appName: 'LI.FI',
        appLogoUrl: LiFiToolLogo,
      };
      connectors['coinbase'] = createCoinbaseConnector(params);
    }

    const wagmiConfig = createConfig({
      chains: _chains,
      connectors: Object.values(connectors) as CreateConnectorFn[],
      client({ chain }) {
        return createClient({ chain, transport: http() });
      },
      // transports: _chains.reduce(
      //   (transports, chain) => {
      //     transports[chain.id] = http();
      //     return transports;
      //   },
      //   {} as Record<number, Transport>,
      // ),

      // Workaround for Wagmi config re-creation after we load chains.
      // Internal Wagmi hydration logic doesn't allow the safe creation of new configs in runtime.
      ssr: !chains?.length,
    });

    return wagmiConfig;
  }, [chains, walletConfig?.coinbase, walletConfig?.walletConnect]);

  return (
    <WagmiProvider
      config={wagmiConfig}
      reconnectOnMount={Boolean(chains?.length)}
    >
      {children}
    </WagmiProvider>
  );
};

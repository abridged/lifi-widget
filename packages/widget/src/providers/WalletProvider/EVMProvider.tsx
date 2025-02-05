import { ChainType } from '@lifi/sdk';
import { useContext, type FC, type PropsWithChildren } from 'react';
import { WagmiContext } from 'wagmi';
import { isItemAllowed } from '../../utils';
import { useWidgetConfig } from '../WidgetProvider';
import { EVMBaseProvider } from './EVMBaseProvider';
import { EVMExternalContext } from './EVMExternalContext';

export function useInWagmiContext(): boolean {
  const { chains } = useWidgetConfig();
  const context = useContext(WagmiContext);

  return Boolean(context) && isItemAllowed(ChainType.EVM, chains?.types);
}

export const EVMProvider: FC<PropsWithChildren> = ({ children }) => {
  const inWagmiContext = useInWagmiContext();

  return inWagmiContext ? (
    <EVMExternalContext.Provider value={inWagmiContext}>
      {children}
    </EVMExternalContext.Provider>
  ) : (
    <EVMBaseProvider>{children}</EVMBaseProvider>
  );
};

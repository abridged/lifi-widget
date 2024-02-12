export { useConfig } from 'wagmi';
export { useFieldActions, useFieldValues } from './stores';
export { App as LiFiWidget } from './App';
export type { WidgetDrawer } from './AppDrawer';
export * from './components/NFT';
export * from './config/version';
export * from './hooks';
export * from './components/Header/WalletHeader';
export * from './pages/SelectWalletPage';
export * from './stores/form/types';
export { formatChain } from './providers/WalletProvider';
export * from './types';
export * from './AppProvider';

// ClassNameGenerator.configure((componentName) =>
//   componentName.replace('Mui', 'LiFi'),
// );

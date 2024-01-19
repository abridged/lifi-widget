export const navigationRoutes = {
  home: '/',
  bridgeHome: 'collabland-bridge',
  activeTransactions: 'collabland-bridge/active-transactions',
  bridges: 'collabland-bridge/bridges',
  exchanges: 'collabland-bridge/exchanges',
  fromChain: 'collabland-bridge/from-chain',
  fromToken: 'collabland-bridge/from-token',
  languages: 'collabland-bridge/languages',
  routes: 'collabland-bridge/routes',
  selectWallet: 'collabland-bridge/select-wallet',
  settings: 'collabland-bridge/settings',
  toChain: 'collabland-bridge/to-chain',
  toToken: 'collabland-bridge/to-token',
  toTokenNative: 'collabland-bridge/to-token-native',
  transactionDetails: 'collabland-bridge/transaction-details',
  transactionExecution: 'collabland-bridge/transaction-execution',
  transactionHistory: 'collabland-bridge/transaction-history',
};

export const navigationRoutesValues = Object.values(navigationRoutes);

export const stickyHeaderRoutes = [
  navigationRoutes.bridgeHome,
  navigationRoutes.activeTransactions,
  navigationRoutes.bridges,
  navigationRoutes.exchanges,
  navigationRoutes.fromChain,
  navigationRoutes.home,
  navigationRoutes.routes,
  navigationRoutes.selectWallet,
  navigationRoutes.settings,
  navigationRoutes.toChain,
  navigationRoutes.toTokenNative,
  navigationRoutes.transactionDetails,
  navigationRoutes.transactionExecution,
  navigationRoutes.transactionHistory,
];

export const backButtonRoutes = [
  navigationRoutes.bridgeHome,
  navigationRoutes.activeTransactions,
  navigationRoutes.bridges,
  navigationRoutes.exchanges,
  navigationRoutes.languages,
  navigationRoutes.fromChain,
  navigationRoutes.fromToken,
  navigationRoutes.routes,
  navigationRoutes.selectWallet,
  navigationRoutes.settings,
  navigationRoutes.toChain,
  navigationRoutes.toToken,
  navigationRoutes.toTokenNative,
  navigationRoutes.transactionDetails,
  navigationRoutes.transactionExecution,
  navigationRoutes.transactionHistory,
];

export type NavigationRouteType = keyof typeof navigationRoutes;

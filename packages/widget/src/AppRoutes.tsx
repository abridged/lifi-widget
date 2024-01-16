import type { RouteObject } from 'react-router-dom';
import { useLocation, useRoutes } from 'react-router-dom';
import { NotFound } from './components/NotFound';
import { ActiveTransactionsPage } from './pages/ActiveTransactionsPage';
import { LanguagesPage } from './pages/LanguagesPage';
import { MainPage } from './pages/MainPage';
import { RoutesPage } from './pages/RoutesPage';
import { SelectChainPage } from './pages/SelectChainPage';
import { SelectEnabledToolsPage } from './pages/SelectEnabledToolsPage';
import { SelectTokenPage } from './pages/SelectTokenPage';
import { SelectWalletPage } from './pages/SelectWalletPage';
import { SettingsPage } from './pages/SettingsPage';
import { TransactionDetailsPage } from './pages/TransactionDetailsPage';
import { TokenHoldingsPage } from './pages/TokenHoldingsPage';
import { TransactionHistoryPage } from './pages/TransactionHistoryPage';
import { TransactionPage } from './pages/TransactionPage';
import { navigationRoutes } from './utils';

// SelectWalletPage should be accessible from every page and this handler helps avoid creating multiple paths.
// Avoid using it for anything else, we need to come up with a better solution once we have one more page accessible from everywhere.
const NotFoundRouteHandler = () => {
  const { pathname } = useLocation();
  return pathname.includes(navigationRoutes.selectWallet) ? (
    <SelectWalletPage />
  ) : (
    <NotFound />
  );
};

const routes: RouteObject[] = [
  {
    path: '/',
    element: <TokenHoldingsPage />,
  },
  {
    path: navigationRoutes.bridgeHome,
    element: <MainPage />,
  },
  {
    path: `${navigationRoutes.bridgeHome}/${navigationRoutes.settings}`,
    element: <SettingsPage />,
  },
  {
    path: `${navigationRoutes.bridgeHome}/${navigationRoutes.settings}/${navigationRoutes.bridges}`,
    element: <SelectEnabledToolsPage type="Bridges" />,
  },
  {
    path: `${navigationRoutes.bridgeHome}/${navigationRoutes.settings}/${navigationRoutes.exchanges}`,
    element: <SelectEnabledToolsPage type="Exchanges" />,
  },
  {
    path: `${navigationRoutes.bridgeHome}/${navigationRoutes.settings}/${navigationRoutes.languages}`,
    element: <LanguagesPage />,
  },
  {
    path: `${navigationRoutes.bridgeHome}/${navigationRoutes.fromToken}`,
    element: <SelectTokenPage formType="from" />,
  },
  {
    path: `${navigationRoutes.bridgeHome}/${navigationRoutes.toToken}`,
    element: <SelectTokenPage formType="to" />,
  },
  {
    path: `${navigationRoutes.bridgeHome}/${navigationRoutes.toTokenNative}`,
    element: <SelectChainPage formType="to" selectNativeToken />,
  },
  {
    path: `${navigationRoutes.bridgeHome}/${navigationRoutes.fromToken}?/${navigationRoutes.fromChain}`,
    element: <SelectChainPage formType="from" />,
  },
  {
    path: `${navigationRoutes.bridgeHome}/${navigationRoutes.toToken}?/${navigationRoutes.toChain}`,
    element: <SelectChainPage formType="to" />,
  },
  {
    path: `${navigationRoutes.bridgeHome}/${navigationRoutes.routes}`,
    element: <RoutesPage />,
  },
  {
    path: `${navigationRoutes.bridgeHome}/${navigationRoutes.activeTransactions}`,
    element: <ActiveTransactionsPage />,
  },
  {
    path: `${navigationRoutes.bridgeHome}/${navigationRoutes.transactionHistory}`,
    element: <TransactionHistoryPage />,
  },
  {
    path: `${navigationRoutes.bridgeHome}/${navigationRoutes.transactionHistory}?/${navigationRoutes.routes}?/${navigationRoutes.transactionExecution}?/${navigationRoutes.transactionDetails}`,
    element: <TransactionDetailsPage />,
  },
  {
    path: `${navigationRoutes.bridgeHome}/${navigationRoutes.routes}?/${navigationRoutes.activeTransactions}?/${navigationRoutes.transactionExecution}`,
    element: <TransactionPage />,
  },
  {
    path: `${navigationRoutes.bridgeHome}/*`,
    element: <NotFoundRouteHandler />,
  },
];

export const AppRoutes = () => {
  const element = useRoutes(routes);
  return element;
};

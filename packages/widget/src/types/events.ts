import type { ChainId, ChainType, Process, Route } from '@lifi/sdk';
import { Chain } from '@collabland/lifi-widget/types/types';

export enum WidgetEvent {
  RouteExecutionStarted = 'routeExecutionStarted',
  RouteExecutionUpdated = 'routeExecutionUpdated',
  RouteExecutionCompleted = 'routeExecutionCompleted',
  RouteExecutionFailed = 'routeExecutionFailed',
  RouteHighValueLoss = 'routeHighValueLoss',
  ContactSupport = 'contactSupport',
  SourceChainTokenSelected = 'sourceChainTokenSelected',
  DestinationChainTokenSelected = 'destinationChainTokenSelected',
  SendToWalletToggled = 'sendToWalletToggled',
  ReviewTransactionPageEntered = 'reviewTransactionPageEntered',
  WalletConnected = 'walletConnected',
  OnSubmitFund = 'onSubmitFund',
  OnChainCardExpanded = 'onChainCardExpanded',
}

export type WidgetEvents = {
  routeExecutionStarted: Route;
  routeExecutionUpdated: RouteExecutionUpdate;
  routeExecutionCompleted: Route;
  routeExecutionFailed: RouteExecutionUpdate;
  routeHighValueLoss: RouteHighValueLossUpdate;
  contactSupport: ContactSupport;
  sourceChainTokenSelected: ChainTokenSelected;
  destinationChainTokenSelected: ChainTokenSelected;
  sendToWalletToggled: boolean;
  reviewTransactionPageEntered?: Route;
  walletConnected: WalletConnected;
  onSubmitFund: OnSubmitFund;
  onChainCardExpanded: OnChainCardExpanded;
};

export interface OnSubmitFund {
  chain: Chain;
  amount: string;
}

export interface OnChainCardExpanded {
  chain: Chain;
  expanded: boolean;
}

export interface ContactSupport {
  supportId?: string;
}

export interface RouteHighValueLossUpdate {
  fromAmountUsd: string;
  gasCostUSD?: string;
  toAmountUSD: string;
  valueLoss: string;
}

export interface RouteExecutionUpdate {
  route: Route;
  process: Process;
}

export interface ChainTokenSelected {
  chainId: ChainId;
  tokenAddress: string;
}

export interface WalletConnected {
  address?: string;
  chainId?: number;
  chainType?: ChainType;
}

import type { ChainId, ChainType, Process, Route } from '@lifi/sdk';

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
  RetryTransaction = 'retryTransaction',
  BridgeButtonClicked = 'bridgeButtonClicked',
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
  retryTransaction: RetryTransaction;
  bridgeButtonClicked: BridgeButtonClicked;
};

export interface OnSubmitFund {
  chain: any;
  amount: string;
}

export interface OnChainCardExpanded {
  chain: any;
  expanded: boolean;
}

export interface RetryTransaction {
  chain: any;
  amount: string;
  toSmartAccount: string;
  quote?: any;
}

export interface BridgeButtonClicked {
  toSmartAccount: string;
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

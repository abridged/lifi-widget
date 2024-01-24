/* eslint-disable no-console */
import type { Route } from '@lifi/sdk';
import type {
  RouteExecutionUpdate,
  RouteHighValueLossUpdate,
  OnSubmitFund,
  OnChainCardExpanded,
  WalletConnected,
  RetryTransaction,
  BridgeButtonClicked,
} from '@collabland/lifi-widget';
import { WidgetEvent, useWidgetEvents } from '@collabland/lifi-widget';
import { useEffect } from 'react';

export const WidgetEvents = () => {
  const widgetEvents = useWidgetEvents();

  useEffect(() => {
    const onRouteExecutionStarted = (route: Route) => {
      console.log('onRouteExecutionStarted fired.');
    };
    const onRouteExecutionUpdated = (update: RouteExecutionUpdate) => {
      console.log('onRouteExecutionUpdated fired.');
    };
    const onRouteExecutionCompleted = (route: Route) => {
      console.log('onRouteExecutionCompleted fired.');
    };
    const onRouteExecutionFailed = (update: RouteExecutionUpdate) => {
      console.log('onRouteExecutionFailed fired.');
    };
    const onRouteHighValueLoss = (update: RouteHighValueLossUpdate) => {
      console.log('onRouteHighValueLoss continued.');
    };
    const onSubmitFund = (fund: OnSubmitFund) => {
      console.log('mem_lifi_on_submit_fund');
    };
    const onChainCardExpanded = (card: OnChainCardExpanded) => {
      console.log('mem_lifi_on_chain_card_expanded');
    };
    const onWalletConnected = (wallet: WalletConnected) => {
      console.log('mem_lifi_on_wallet_connected');
    };
    const onRetryTransaction = (transaction: RetryTransaction) => {
      console.log('mem_lifi_on_retry_transaction');
    };
    const onBridgeButtonClicked = (button: BridgeButtonClicked) => {
      console.log('mem_lifi_on_bridge_button_clicked');
    };
    widgetEvents.on(WidgetEvent.RouteExecutionStarted, onRouteExecutionStarted);
    widgetEvents.on(WidgetEvent.RouteExecutionUpdated, onRouteExecutionUpdated);
    widgetEvents.on(
      WidgetEvent.RouteExecutionCompleted,
      onRouteExecutionCompleted,
    );
    widgetEvents.on(WidgetEvent.RouteHighValueLoss, onRouteHighValueLoss);
    widgetEvents.on(WidgetEvent.RouteExecutionFailed, onRouteExecutionFailed);
    widgetEvents.on(WidgetEvent.OnSubmitFund, onSubmitFund);
    widgetEvents.on(WidgetEvent.OnChainCardExpanded, onChainCardExpanded);
    widgetEvents.on(WidgetEvent.WalletConnected, onWalletConnected);
    widgetEvents.on(WidgetEvent.RetryTransaction, onRetryTransaction);
    widgetEvents.on(WidgetEvent.BridgeButtonClicked, onBridgeButtonClicked);
    return () => widgetEvents.all.clear();
  }, [widgetEvents]);

  return null;
};

/* eslint-disable no-console */
import type { Route } from '@lifi/sdk';
import type {
  RouteExecutionUpdate,
  RouteHighValueLossUpdate,
} from '@collabland/lifi-widget';
import { WidgetEvent, useWidgetEvents } from '@collabland/lifi-widget';
import { useEffect } from 'react';
import { OnSubmitFund } from '@collabland/lifi-widget/dist/_esm';

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

    const onSubmitBridge = (update: OnSubmitFund) => {
      console.log('onSubmitBridge continued.');
    };
    widgetEvents.on(WidgetEvent.OnSubmitFund, onSubmitBridge);
    widgetEvents.on(WidgetEvent.RouteExecutionStarted, onRouteExecutionStarted);
    widgetEvents.on(WidgetEvent.RouteExecutionUpdated, onRouteExecutionUpdated);
    widgetEvents.on(
      WidgetEvent.RouteExecutionCompleted,
      onRouteExecutionCompleted,
    );
    widgetEvents.on(WidgetEvent.RouteHighValueLoss, onRouteHighValueLoss);
    widgetEvents.on(WidgetEvent.RouteExecutionFailed, onRouteExecutionFailed);
    return () => widgetEvents.all.clear();
  }, [widgetEvents]);

  return null;
};

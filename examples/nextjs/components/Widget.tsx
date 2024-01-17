import { LiFiWidget, WidgetConfig } from '@collabland/lifi-widget';
import { WidgetEvents } from './WidgetEvents';

export const Widget = () => {
  const widgetConfig: WidgetConfig = {
    containerStyle: {},
    fromChain: 1,
    fromToken: 'ETH',
    fromAmount: '1',
    // set destination chain to Arb
    toChain: 42161,
    // set source token to
    toToken: 'ETH',
    // user smart account
    toAddress: '',
    integrator: 'Telefrens',
    theme: {
      palette: {
        primary: { main: '#FFDF37' },
        secondary: { main: '#F5B5FF' },
        background: {
          paper: '#1C373F', // bg color for cards
          default: 'rgba(255, 255, 0, 0)', // bg color container
        },
        grey: {
          300: '#696969', // border light theme
          800: '#696969', // border dark theme
        },
      },
      shape: {
        borderRadius: 16,
        borderRadiusSecondary: 100,
      },
      typography: {
        fontFamily: 'sans-serif',
        fontSize: 12,
      },
    },
    appearance: 'dark',
    hiddenUI: ['appearance'],
    disabledUI: ['toAddress', 'toToken'],
    // bridges: { // only for smart contract wallet
    //   allow: ["hop"],
    // },
  };
  return (
    <div style={{ backgroundColor: '#000', color: '#fff' }}>
      <WidgetEvents />
      <LiFiWidget config={widgetConfig} integrator="nextjs-example" />
    </div>
  );
};

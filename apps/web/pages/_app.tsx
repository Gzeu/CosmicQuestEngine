import { DappProvider } from '@multiversx/sdk-dapp/wrappers/DappProvider';
import { EnvironmentsEnum } from '@multiversx/sdk-dapp/types';
import type { AppProps } from 'next/app';
import '../styles.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <DappProvider
      environment={EnvironmentsEnum.testnet}
      customNetworkConfig={{ walletConnectV2ProjectId: process.env.NEXT_PUBLIC_WC_PROJECT_ID || '' }}
      dappConfig={{ shouldUseWebViewProvider: false }}
    >
      <Component {...pageProps} />
    </DappProvider>
  );
}

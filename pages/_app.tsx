import type { AppProps } from 'next/app';
import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import {
  chain,
  configureChains,
  createClient,
  WagmiConfig,
} from 'wagmi';
import { infuraProvider } from 'wagmi/providers/infura';
import { publicProvider } from 'wagmi/providers/public';
import { globalStyles } from '@/styles/globals';
import { Layout } from '@/components/Layout';
import { Navbar } from '@/components/Navbar';


function MyApp({ Component, pageProps }: AppProps) {
  const { chains, provider } = configureChains(
    [
      // mainnet
      // chain.optimism,
      // testnet
      chain.goerli,
    ],
    [
      infuraProvider({ apiKey: process.env.NEXT_PUBLIC_INFURA_API_KEY }),
      publicProvider(),
    ]
  );
  
  const { connectors } = getDefaultWallets({
    appName: 'My RainbowKit App',
    chains
  });
  
  const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider
  });

  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <Layout>
          <Navbar />
          {globalStyles}
          <Component {...pageProps} />
        </Layout>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp

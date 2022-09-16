import type { AppProps } from 'next/app';
import { globalStyles } from '@/styles/globals.js';
import { Layout } from '@/components/Layout';
import { Navbar } from '@/components/Navbar';


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Navbar />
      {globalStyles}
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp

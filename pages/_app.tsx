import { Layout } from '@/components/Layout';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import { globalStyles } from '@/styles/globals.js'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <ThemeSwitcher />
      {globalStyles}
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp

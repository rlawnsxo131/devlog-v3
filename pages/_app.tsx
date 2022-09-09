import Layout from '@/components/Layout';
import useThemeEffect from '@/hooks/theme/useThemeEffect';
import globalStyles from '@/styles/globalStyles';

export default function App({ Component, pageProps }) {
  globalStyles();
  useThemeEffect();

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

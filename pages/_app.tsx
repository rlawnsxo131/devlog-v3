import Layout from '@/components/Layout';
import useThemeEffect from '@/hooks/theme/useThemeEffect';
import globalStyle from '@/styles/globalStyle';

export default function App({ Component, pageProps }) {
  globalStyle();
  useThemeEffect();

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

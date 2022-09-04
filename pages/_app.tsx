import globalStyles from '@/styles/globalStyles';

export default function App({ Component, pageProps }) {
  globalStyles();

  return <Component {...pageProps} />;
}

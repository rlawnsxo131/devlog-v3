import { globalStyles } from '@/styles/globalStyles';

function App({ Component, pageProps }) {
  globalStyles();
  return <Component {...pageProps} />;
}

export default App;

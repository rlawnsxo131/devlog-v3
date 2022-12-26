import type { AppProps } from 'next/app';

import { AppCopyright, AppLayout } from '@/components/app';
import { Core, HeaderLogo } from '@/components/base';
import FooterMobileMenu from '@/components/base/FooterMobileMenu';
import HeaderWebMenu from '@/components/base/HeaderWebMenu';
import { ErrorBoundary } from '@/components/error';
import ThemeButton from '@/components/system/ThemeButton';
import Toast from '@/components/system/Toast';
import { GlobalContextProvider } from '@/contexts/GlobalContext';
import useGTagEffect from '@/hooks/useGTagEffect';
import globalStyle from '@/styles/globalStyle';

export default function App({ Component, pageProps }: AppProps) {
  globalStyle();
  useGTagEffect();

  return (
    <ErrorBoundary>
      <GlobalContextProvider>
        <Core>
          <AppLayout>
            <AppLayout.Header
              leftSideItems={<HeaderLogo />}
              rightSideItems={
                <>
                  <HeaderWebMenu />
                  <ThemeButton />
                </>
              }
            />
            <AppLayout.Main>
              <Component {...pageProps} />
              <AppCopyright />
            </AppLayout.Main>
            <AppLayout.Footer>
              <FooterMobileMenu />
            </AppLayout.Footer>
          </AppLayout>
          <Toast />
        </Core>
      </GlobalContextProvider>
    </ErrorBoundary>
  );
}

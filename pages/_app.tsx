import { useRouter } from 'next/router';
import Script from 'next/script';
import { useEffect } from 'react';

import { AppCopyright, AppLayout } from '@/components/app';
import { Core, HeaderLogo, HeaderMobileMenu } from '@/components/base';
import HeaderWebMenu from '@/components/base/HeaderWebMenu';
import ThemeButton from '@/components/system/ThemeButton';
import Toast from '@/components/system/Toast';
import constants from '@/constants';
import { GlobalContextProvider } from '@/contexts/GlobalContext';
import useGTagEffect from '@/hooks/useGTagEffect';
import { gTag } from '@/lib';
import globalStyle from '@/styles/globalStyle';

export default function App({ Component, pageProps }) {
  globalStyle();
  useGTagEffect();

  return (
    <>
      {constants.IS_PRODUCTION && (
        <>
          <Script
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${gTag.GA_TRACKING_ID}`}
          />
          <Script
            id="gtag-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gTag.GA_TRACKING_ID}', {
                page_path: window.location.pathname,
              });
            `,
            }}
          />
        </>
      )}
      <GlobalContextProvider>
        <Core>
          <AppLayout>
            <AppLayout.Header
              leftSideItems={<HeaderLogo />}
              rightSideItems={
                <>
                  <HeaderWebMenu />
                  <ThemeButton />
                  <HeaderMobileMenu />
                </>
              }
            />
            <AppLayout.Main>
              <Component {...pageProps} />
            </AppLayout.Main>
            <AppLayout.Footer>
              <AppCopyright />
            </AppLayout.Footer>
          </AppLayout>
          <Toast />
        </Core>
      </GlobalContextProvider>
    </>
  );
}

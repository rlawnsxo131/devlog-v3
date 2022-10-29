import { Core, HeaderLogo, HeaderMobileMenu } from '@/components/base';
import HeaderWebMenu from '@/components/base/HeaderWebMenu';
import { AppLayout } from '@/components/app';
import RssAnchor from '@/components/system/RssAnchor';
import ThemeButton from '@/components/system/ThemeButton';
import Toast from '@/components/system/Toast';
import globalStyle from '@/styles/globalStyle';
import { GlobalContextProvider } from 'contexts/GlobalContext';

export default function App({ Component, pageProps }) {
  globalStyle();

  return (
    <GlobalContextProvider>
      <Core>
        <AppLayout>
          <AppLayout.Header
            leftSideItems={<HeaderLogo />}
            rightSideItems={
              <>
                <HeaderWebMenu />
                <RssAnchor />
                <ThemeButton />
                <HeaderMobileMenu />
              </>
            }
          />
          <AppLayout.Main>
            <Component {...pageProps} />
          </AppLayout.Main>
        </AppLayout>
        <Toast />
      </Core>
    </GlobalContextProvider>
  );
}

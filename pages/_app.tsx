import { HeaderLogo, HeaderMobileMenu } from '@/components/base';
import HeaderWebMenu from '@/components/base/HeaderWebMenu';
import { AppLayout } from '@/components/layouts';
import RssButton from '@/components/system/RssButton/RssButton';
import ThemeButton from '@/components/system/ThemeButton';
import Toast from '@/components/system/Toast';
import useThemeEffect from '@/hooks/theme/useThemeEffect';
import globalStyle from '@/styles/globalStyle';

export default function App({ Component, pageProps }) {
  globalStyle();
  useThemeEffect();

  return (
    <>
      <AppLayout>
        <AppLayout.Header
          leftSideItems={<HeaderLogo />}
          rightSideItems={
            <>
              <HeaderWebMenu />
              <RssButton />
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
    </>
  );
}

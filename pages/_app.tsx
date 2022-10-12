import { HeaderLogo, HeaderMenu } from '@/components/base';
import { AppLayout } from '@/components/layouts';
import ThemeButton from '@/components/system/ThemeButton';
import useThemeEffect from '@/hooks/theme/useThemeEffect';
import globalStyle from '@/styles/globalStyle';

export default function App({ Component, pageProps }) {
  globalStyle();
  useThemeEffect();

  return (
    <AppLayout>
      <AppLayout.Header
        leftSideItems={<HeaderLogo />}
        rightSideItems={
          <>
            <ThemeButton />
            <HeaderMenu />
          </>
        }
      />
      <AppLayout.Main>
        <Component {...pageProps} />
      </AppLayout.Main>
    </AppLayout>
  );
}

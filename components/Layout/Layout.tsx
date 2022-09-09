import { css } from '@/styles/_stitches.config';
import JohnContactLink from '../JohnContactLink';
import ThemeButton from '../ThemeButton';
import Header from './Header';
import HeaderLogo from './HeaderLogo';
import HeaderMenu from './HeaderMenu';
import Main from './Main';

interface Props {
  children: React.ReactNode;
}

function Layout({ children }: Props) {
  return (
    <div className={block()}>
      <Header
        leftSideItems={<HeaderLogo />}
        rightSideItems={
          <>
            <ThemeButton />
            <HeaderMenu />
          </>
        }
      />
      <JohnContactLink />
      <Main>{children}</Main>
    </div>
  );
}

const block = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  height: '100%',
  overflowY: 'scroll',
});

export default Layout;

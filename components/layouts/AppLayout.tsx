import { css } from '@/styles/_stitches.config';
import AppHeader from './AppHeader';
import AppMain from './AppMain';

interface Props {
  children: React.ReactNode;
}

function AppLayout({ children }: Props) {
  return (
    <div className={block()}>
      {children}
      <div className={fakePaddingArea()} />
    </div>
  );
}

const block = css({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  height: '100%',
});

const fakePaddingArea = css({
  padding: '3rem',
});

AppLayout.Header = AppHeader;
AppLayout.Main = AppMain;

export default AppLayout;

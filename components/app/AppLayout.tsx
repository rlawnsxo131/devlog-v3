import { css } from '@/styles/_stitches.config';

import AppFooter from './AppFooter';
import AppHeader from './AppHeader';
import AppMain from './AppMain';

interface Props {
  children: React.ReactNode;
}

function AppLayout({ children }: Props) {
  return <div className={block()}>{children}</div>;
}

const block = css({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  minHeight: '100%',
});

AppLayout.Header = AppHeader;
AppLayout.Main = AppMain;
AppLayout.Footer = AppFooter;

export default AppLayout;

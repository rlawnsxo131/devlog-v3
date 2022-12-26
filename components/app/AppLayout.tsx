import type { PropsWithChildren } from 'react';

import { css } from '@/styles/_stitches.config';

import AppFooter from './AppFooter';
import AppHeader from './AppHeader';
import AppMain from './AppMain';

function AppLayout({ children }: PropsWithChildren) {
  return <div className={block()}>{children}</div>;
}

const block = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  height: '100%',
});

AppLayout.Header = AppHeader;
AppLayout.Main = AppMain;
AppLayout.Footer = AppFooter;

export default AppLayout;

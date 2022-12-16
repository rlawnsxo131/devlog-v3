import type { PropsWithChildren } from 'react';

import { css } from '@/styles/_stitches.config';
import { layoutBasicResponsiveStyle } from '@/styles/basicStyle';

function AppMain({ children }: PropsWithChildren) {
  return <main className={block()}>{children}</main>;
}

const block = css({
  ...layoutBasicResponsiveStyle,
  position: 'relative',
  flex: '1 1 100%',
  display: 'flex',
  flexDirection: 'column',
  marginTop: '6.225rem',
});

export default AppMain;

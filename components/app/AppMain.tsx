import type { PropsWithChildren } from 'react';

import { css } from '@/styles/_stitches.config';
import { layoutBasicResponsiveStyle } from '@/styles/basicStyle';

function AppMain({ children }: PropsWithChildren) {
  return <main className={block()}>{children}</main>;
}

const block = css({
  ...layoutBasicResponsiveStyle,
  flex: '1 1 100%',
  display: 'flex',
  flexDirection: 'column',
});

export default AppMain;

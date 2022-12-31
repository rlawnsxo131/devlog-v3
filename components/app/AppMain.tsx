import type { PropsWithChildren } from 'react';

import { css } from '@/styles/_stitches.config';

function AppMain({ children }: PropsWithChildren) {
  return <main className={block()}>{children}</main>;
}

const block = css({
  flex: '1 1 100%',
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
});

export default AppMain;

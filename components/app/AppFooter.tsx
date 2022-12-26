import type { PropsWithChildren } from 'react';

import { css } from '@/styles/_stitches.config';

function AppFooter({ children }: PropsWithChildren) {
  return <footer className={block()}>{children}</footer>;
}

const block = css({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  '@xxxs': {
    marginTop: '3.8rem',
  },
  '@m1': {
    marginTop: '5.8rem',
  },
});

export default AppFooter;

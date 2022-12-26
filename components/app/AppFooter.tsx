import type { PropsWithChildren } from 'react';

import { css } from '@/styles/_stitches.config';

function AppFooter({ children }: PropsWithChildren) {
  return <footer className={block()}>{children}</footer>;
}

const block = css({
  width: '100%',
});

export default AppFooter;

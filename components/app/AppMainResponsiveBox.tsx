import type { ReactNode } from 'react';

import { css } from '@/styles/_stitches.config';
import { layoutBasicResponsiveStyle } from '@/styles/basicStyle';

interface Props {
  children: ReactNode;
}

function AppMainResponsiveBox({ children }: Props) {
  return <div className={block()}>{children}</div>;
}

const block = css({
  ...layoutBasicResponsiveStyle,
  marginTop: '4rem',
});

export default AppMainResponsiveBox;

import type { PropsWithChildren } from 'react';

import { css } from '@/styles/_stitches.config';

function AppMainContentBox({ children }: PropsWithChildren) {
  return (
    <div className={block()}>
      <section className={section()}>{children}</section>
    </div>
  );
}

const block = css({
  display: 'flex',
  justifyContent: 'center',
  marginTop: '2rem',
});

const section = css({
  position: 'relative',
  width: '100%',
  maxWidth: '768px',
  display: 'flex',
  flexDirection: 'column',
});

export default AppMainContentBox;

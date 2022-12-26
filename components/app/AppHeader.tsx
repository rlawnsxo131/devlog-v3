import type { ReactNode } from 'react';

import { css } from '@/styles/_stitches.config';
import { layoutBasicResponsiveStyle } from '@/styles/basicStyle';

interface Props {
  leftSideItems: ReactNode;
  rightSideItems: ReactNode;
}

function AppHeader({ leftSideItems, rightSideItems }: Props) {
  return (
    <header className={block()}>
      <div className={contentBlock()}>
        <div className={items()}>{leftSideItems}</div>
        <div className={items({ gap: 'enabled' })}>{rightSideItems}</div>
      </div>
    </header>
  );
}

const block = css({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  background: '$bg',
  zIndex: '$header',
});

const contentBlock = css({
  ...layoutBasicResponsiveStyle,
  display: 'flex',
  justifyContent: 'space-between',
  height: '4rem',
});

const items = css({
  display: 'flex',
  alignItems: 'center',
  variants: {
    gap: {
      disabled: {
        gap: '0',
      },
      enabled: {
        '& > * + *': {
          marginLeft: '0.5rem',
        },
      },
    },
  },
  defaultVariants: {
    gap: 'disabled',
  },
});

export default AppHeader;

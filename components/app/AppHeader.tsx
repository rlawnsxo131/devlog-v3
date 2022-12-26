import type { ReactNode } from 'react';

import { css } from '@/styles/_stitches.config';

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
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  background: '$bg',
  zIndex: '$header',
});

const contentBlock = css({
  display: 'flex',
  justifyContent: 'space-between',
  height: '4rem',
  '@xxxs': {
    width: '93%',
  },
  '@m1': {
    width: '783px',
  },
  '@m2': {
    width: '875px',
  },
  '@l1': {
    width: '1215px',
  },
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

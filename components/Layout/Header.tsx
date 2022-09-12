import { layoutBasicResponsiveStyle } from '@/styles/basicStyle';
import { css } from '@/styles/_stitches.config';

interface Props {
  leftSideItems: React.ReactNode;
  rightSideItems: React.ReactNode;
}

function Header({ leftSideItems, rightSideItems }: Props) {
  return (
    <header className={block()}>
      <div className={contentsBlock()}>
        <div className={items()}>{leftSideItems}</div>
        <div className={items({ gap: 'enabled' })}>{rightSideItems}</div>
      </div>
    </header>
  );
}

const block = css({
  position: 'fixed',
  top: '0',
  left: '0',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  background: '$bg',
  zIndex: '$header',
});

const contentsBlock = css({
  display: 'flex',
  justifyContent: 'space-between',
  height: '4rem',
  ...layoutBasicResponsiveStyle,
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
        gap: '0.25rem',
      },
    },
  },
  defaultVariants: {
    gap: 'disabled',
  },
});

export default Header;

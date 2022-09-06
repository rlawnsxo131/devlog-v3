import { layoutBasicResponsiveStyles } from '@/styles/basicStyles';
import { css } from '@/styles/_stitches.config';

interface Props {
  leftSideItems: React.ReactNode;
  rightSideItems: React.ReactNode;
}

function Header({ leftSideItems, rightSideItems }: Props) {
  return (
    <header className={block()}>
      <div className={items()}>{leftSideItems}</div>
      <div className={items({ gap: 'enabled' })}>{rightSideItems}</div>
    </header>
  );
}

const block = css({
  border: '1px solid black',
  position: 'sticky',
  top: '0',
  left: '0',
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: '3.25rem',
  ...layoutBasicResponsiveStyles,
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

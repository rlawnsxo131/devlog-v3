import { css } from '@/styles/_stitches.config';

interface Props {
  children: React.ReactNode;
}

function AppFooter({ children }: Props) {
  return <footer className={block()}>{children}</footer>;
}

const block = css({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  '@xxxs': {
    height: '8rem',
  },
  '@m1': {
    height: '10rem',
  },
});

export default AppFooter;

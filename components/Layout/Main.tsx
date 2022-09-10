import { layoutBasicResponsiveStyle } from '@/styles/basicStyle';
import { css } from '@/styles/_stitches.config';

interface Props {
  children: React.ReactNode;
}

function Main({ children }: Props) {
  return <main className={block()}>{children}</main>;
}

const block = css({
  ...layoutBasicResponsiveStyle,
  marginTop: '8.225rem',
});

export default Main;

import { layoutBasicResponsiveStyles } from '@/styles/basicStyles';
import { css } from '@/styles/_stitches.config';

interface Props {
  children: React.ReactNode;
}

function Main({ children }: Props) {
  return <main className={block()}>{children}</main>;
}

const block = css({
  ...layoutBasicResponsiveStyles,
});

export default Main;

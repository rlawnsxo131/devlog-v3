import { layoutBasicResponsiveStyle } from '@/styles/basicStyle';
import { css } from '@/styles/_stitches.config';

interface Props {
  children: React.ReactNode;
}

function AppMain({ children }: Props) {
  return <main className={block()}>{children}</main>;
}

const block = css({
  ...layoutBasicResponsiveStyle,
  marginTop: '6.225rem',
});

export default AppMain;
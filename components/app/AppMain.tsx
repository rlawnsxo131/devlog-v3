import { css } from '@/styles/_stitches.config';
import { layoutBasicResponsiveStyle } from '@/styles/basicStyle';

interface Props {
  children: React.ReactNode;
}

function AppMain({ children }: Props) {
  return <main className={block()}>{children}</main>;
}

const block = css({
  ...layoutBasicResponsiveStyle,
  position: 'relative',
  flex: '1 1 100%',
  display: 'flex',
  flexDirection: 'column',
  marginTop: '6.225rem',
});

export default AppMain;

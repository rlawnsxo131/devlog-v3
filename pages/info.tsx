import { css } from '@/styles/_stitches.config';
import { layoutBasicResponsiveStyle } from '@/styles/basicStyle';

export default function InfoPage() {
  return <div className={block()}>info</div>;
}

const block = css({
  ...layoutBasicResponsiveStyle,
});

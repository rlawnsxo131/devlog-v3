import { css, StitchesCSS } from '@/styles/_stitches.config';

interface Props {
  cssProps: StitchesCSS;
}

function Separator({ cssProps }: Props) {
  return (
    <div
      className={block({
        css: {
          ...cssProps,
        },
      })}
    >
      ·
    </div>
  );
}

const block = css({});

export default Separator;

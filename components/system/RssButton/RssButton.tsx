import { css } from '@/styles/_stitches.config';
import { RssIcon } from '@/components/img/icons';
import { buttonBasicStyle, buttonWithSVGBasicStyle } from '@/styles/basicStyle';

interface Props {}

function RssButton(props: Props) {
  return (
    <button type="button" className={block()}>
      <RssIcon />
    </button>
  );
}

const block = css({
  ...buttonBasicStyle,
  ...buttonWithSVGBasicStyle,
  padding: '0.5rem',
});

export default RssButton;

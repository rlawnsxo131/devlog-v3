import { css } from '@/styles/_stitches.config';
import { RssIcon } from '@/components/img/icons';
import { buttonBasicStyle, buttonWithSVGBasicStyle } from '@/styles/basicStyle';

interface Props {}

function RssButton(props: Props) {
  return (
    <a
      rel="noopener noreferrer"
      href={`${process.env.NEXT_PUBLIC_SERVICE_URL}/rss/feed.xml`}
      target="_blank"
    >
      <RssIcon />
    </a>
  );
}

const block = css({
  ...buttonBasicStyle,
  ...buttonWithSVGBasicStyle,
  padding: '0.5rem',
});

export default RssButton;

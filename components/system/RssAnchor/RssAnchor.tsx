import { RssIcon } from '@/components/img/icons';
import { SiteConfig } from '@/config';
import { css } from '@/styles/_stitches.config';
import { buttonBasicStyle, buttonWithSVGBasicStyle } from '@/styles/basicStyle';

interface Props {}

function RssAnchor(props: Props) {
  return (
    <a
      rel="noopener noreferrer"
      href={`${SiteConfig.url}/rss/feed.xml`}
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

export default RssAnchor;

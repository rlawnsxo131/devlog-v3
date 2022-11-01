import { css } from '@/styles/_stitches.config';
import { RssIcon } from '@/components/img/icons';
import { buttonBasicStyle, buttonWithSVGBasicStyle } from '@/styles/basicStyle';
import { SiteConfig } from 'config';

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

import { css } from '@/styles/_stitches.config';

import {
  EmailIcon,
  GithubIcon,
  LinkedinIcon,
  RssIcon,
  TwitterIcon,
} from '../img/icons';

interface Props {}

function ContactLinks(props: Props) {
  return (
    <div className={block()}>
      <a
        area-label="go to github"
        className={wrapAnchor()}
        rel="noopener noreferrer"
        href="https://github.com/rlawnsxo131"
        target="_blank"
      >
        <GithubIcon />
      </a>
      <a
        area-label="go to linked in"
        className={wrapAnchor()}
        rel="noopener noreferrer"
        href="https://www.linkedin.com/in/juntae-kim-8441ba238/"
        target="_blank"
      >
        <LinkedinIcon />
      </a>
      <a
        area-label="go to twitter"
        className={wrapAnchor()}
        rel="noopener noreferrer"
        href="https://twitter.com/john_xxoo"
        target="_blank"
      >
        <TwitterIcon />
      </a>
      <a
        area-label="send mail"
        className={wrapAnchor()}
        rel="noopener noreferrer"
        href="mailto:public.juntae@gmail.com"
        target="_blank"
      >
        <EmailIcon />
      </a>
      <a
        area-label="go to rss feed"
        className={wrapAnchor()}
        rel="noopener noreferrer"
        href="/rss/feed.xml"
        target="_blank"
      >
        <RssIcon />
      </a>
    </div>
  );
}

const block = css({
  display: 'flex',
  alignItems: 'center',
  padding: '1rem',
  background: '$bg-info-section',
  boxShadow: '$default1',
  borderRadius: '4px',
});

const wrapAnchor = css({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '3rem',
  height: '2.5rem',
  borderRadius: '3px',
  '& + &': {
    marginLeft: '1rem',
  },
  '&:hover': {
    background: '$bg-hover',
  },
});

export default ContactLinks;

import { EmailIcon, GithubIcon, LinkedinIcon } from '@/icons/index';
import { layoutBasicResponsiveStyle } from '@/styles/basicStyle';
import { css } from '@/styles/_stitches.config';

interface Props {}

function JohnContactLink(props: Props) {
  return (
    <div className={block()}>
      <a
        className={wrapAnchor()}
        rel="noopener noreferrer"
        href="https://github.com/rlawnsxo131"
        target="_blank"
      >
        <GithubIcon />
      </a>
      <a
        className={wrapAnchor()}
        rel="noopener noreferrer"
        href="mailto:public.juntae@gmail.com"
        target="_blank"
      >
        <EmailIcon />
      </a>
      <a
        className={wrapAnchor()}
        rel="noopener noreferrer"
        href="https://www.linkedin.com/in/juntae-kim-8441ba238/"
        target="_blank"
      >
        <LinkedinIcon />
      </a>
    </div>
  );
}

const block = css({
  display: 'flex',
  alignItems: 'center',
  ...layoutBasicResponsiveStyle,
});

const wrapAnchor = css({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '2.5rem',
  height: '2.5rem',
  borderRadius: '3px',
  '& + &': {
    marginLeft: '0.5rem',
  },
  '&:hover': {
    background: '$bg-hover',
  },
});

export default JohnContactLink;

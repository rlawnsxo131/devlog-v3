import { css } from '@/styles/_stitches.config';
import Link from 'next/link';

interface Props {}

function HeaderLogo(props: Props) {
  return (
    <div className={block()}>
      <Link href="/">
        <a>
          <h1>DevLog</h1>
        </a>
      </Link>
    </div>
  );
}

const block = css({
  display: 'inline-flex',
  flexFlow: 'row wrap',
  fontSize: '1.25rem',
  '& h1': {
    margin: '0',
    padding: '0',
    fontWeight: '400',
    fontSize: '1.5rem',
  },
});

export default HeaderLogo;

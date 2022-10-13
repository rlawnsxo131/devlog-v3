import { css } from '@/styles/_stitches.config';

interface Props {
  children: React.ReactNode;
}

function PostListLayout({ children }: Props) {
  return <div className={block()}>{children}</div>;
}

const block = css({
  width: '100%',
  display: 'grid',
  '@xxxsmall': {
    gridAutoRows: '19rem',
    gridTemplateColumns: 'repeat(1, 1fr)',
    gap: '1rem 0',
  },
  '@xxsmall': {
    gridAutoRows: '21rem',
    gridTemplateColumns: 'repeat(1, 1fr)',
    gap: '1rem 0',
  },
  '@xsmall': {
    gridAutoRows: '22rem',
    gridTemplateColumns: 'repeat(1, 1fr)',
    gap: '1rem 0',
  },
  '@xsmallmedium': {
    gridAutoRows: '28rem',
    gridTemplateColumns: 'repeat(1, 1fr)',
    gap: '1rem 0',
  },
  '@xsmalllarge': {
    gridAutoRows: '21rem',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '1rem 1rem',
  },
  '@small': {
    gridAutoRows: '25rem',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '1rem 1rem',
  },
  '@medium': {
    gridAutoRows: '19rem',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '1.5rem 1rem',
  },
});

export default PostListLayout;

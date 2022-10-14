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
  '@xxxs1': {
    gridAutoRows: '19rem',
    gridTemplateColumns: 'repeat(1, 1fr)',
    gap: '1rem 0',
  },
  '@xxs1': {
    gridAutoRows: '21rem',
    gridTemplateColumns: 'repeat(1, 1fr)',
    gap: '1rem 0',
  },
  '@xs1': {
    gridAutoRows: '22rem',
    gridTemplateColumns: 'repeat(1, 1fr)',
    gap: '1rem 0',
  },
  '@xs2': {
    gridAutoRows: '28rem',
    gridTemplateColumns: 'repeat(1, 1fr)',
    gap: '1rem 0',
  },
  '@xs3': {
    gridAutoRows: '21rem',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '1rem 1rem',
  },
  '@s1': {
    gridAutoRows: '25rem',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '1rem 1rem',
  },
  '@m1': {
    gridAutoRows: '19rem',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '1.5rem 1rem',
  },
});

export default PostListLayout;

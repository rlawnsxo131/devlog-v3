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
  '@xxxs': {
    gridAutoRows: '21rem',
    gridTemplateColumns: 'repeat(1, 1fr)',
    gap: '1rem 0',
  },
  '@xs2': {
    gridAutoRows: '23rem',
    gridTemplateColumns: 'repeat(1, 1fr)',
    gap: '1rem 1rem',
  },
  mediaQuery: {
    minWidth: 490,
    styles: {
      gridAutoRows: '26rem',
      gridTemplateColumns: 'repeat(1, 1fr)',
      gap: '1rem 1rem',
    },
  },
  '@xs3': {
    gridAutoRows: '21rem',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '1rem 1rem',
  },
  '@s1': {
    gridAutoRows: '22rem',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '1rem 1rem',
  },
  '@s2': {
    gridAutoRows: '24rem',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '1rem 1rem',
  },
  '@m1': {
    gridAutoRows: '22rem',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '1rem 1rem',
  },
  '@m2': {
    gridAutoRows: '19rem',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '1rem 1rem',
  },
  '@l1': {
    gridAutoRows: '19rem',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '1rem 1rem',
  },
});

export default PostListLayout;

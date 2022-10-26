import { css } from '@/styles/_stitches.config';

interface Props {
  header: React.ReactNode;
  thumbnail: React.ReactNode;
  body: React.ReactNode;
}

function PostLayout({ header, thumbnail, body }: Props) {
  return (
    <div className={block()}>
      <div className={headerBlock()}>{header}</div>
      <div className={thumbnailBlock()}>{thumbnail}</div>
      <div className={bodyBlock()}>{body}</div>
    </div>
  );
}

const block = css({
  display: 'flex',
  flexDirection: 'column',
});

const headerBlock = css({
  '@m1': {
    marginTop: '1.25rem',
  },
});

const thumbnailBlock = css({
  marginTop: '1.25rem',
});

const bodyBlock = css({
  display: 'flex',
  flexDirection: 'column',
  marginTop: '1.25rem',
});

export default PostLayout;

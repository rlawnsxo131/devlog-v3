import { css } from '@/styles/_stitches.config';

interface Props {}

function PostCardImageSkeleton(props: Props) {
  return <div className={block()} />;
}

const block = css({
  position: 'absolute',
  top: '0',
  left: '0',
  width: '100%',
  height: '100%',
  borderRadius: '0.5rem',
  background: '$bg-skeleton',
});

export default PostCardImageSkeleton;

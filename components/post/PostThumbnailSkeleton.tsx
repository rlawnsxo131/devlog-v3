import { css } from '@/styles/_stitches.config';

interface Props {}

function PostThumbnailSkeleton(props: Props) {
  return <div className={block()} />;
}

const block = css({
  display: 'block',
  position: 'absolute',
  top: '0',
  left: '0',
  width: '100%',
  height: '100%',
  background: '$bg-skeleton',
  borderRadius: '0.5rem',
});

export default PostThumbnailSkeleton;

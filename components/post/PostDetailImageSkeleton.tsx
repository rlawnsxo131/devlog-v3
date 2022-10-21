import { css } from '@/styles/_stitches.config';

interface Props {}

function PostDetailImageSkeleton(props: Props) {
  return <div className={block()} />;
}

const block = css({
  position: 'relative',
  width: '100%',
  paddingTop: '52.35%',
  background: '$bg-skeleton',
  borderRadius: '0.5rem',
});

export default PostDetailImageSkeleton;

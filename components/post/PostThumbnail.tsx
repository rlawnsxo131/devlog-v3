import Image from 'next/image';

import useImageOnLoadingComplete from '@/hooks/useImageOnLoadingComplete';
import { css } from '@/styles/_stitches.config';
import type { Post } from '@/types';

type Props = Pick<Post, 'thumbnail'>;

function PostThumbnail({ thumbnail }: Props) {
  const { isLoadingComplete, onLoadingComplete } = useImageOnLoadingComplete();

  return (
    <div className={block()}>
      <Image
        className={thumbnailBlock()}
        src={thumbnail}
        alt={thumbnail}
        layout="fill"
        loading="eager"
        sizes="768px"
        onLoadingComplete={onLoadingComplete}
      />
      {!isLoadingComplete && <div className={thumbnailSkeleton()} />}
    </div>
  );
}

const block = css({
  position: 'relative',
  width: '100%',
  height: 'auto',
  display: 'flex',
  justifyContent: 'center',
  paddingTop: '52.35%',
  '& span': {
    position: 'unset !important',
  },
});

const thumbnailBlock = css({
  borderRadius: '0.5rem',
  objectFit: 'cover !important',
});

const thumbnailSkeleton = css({
  display: 'block',
  position: 'absolute',
  top: '0',
  left: '0',
  width: '100%',
  height: '100%',
  background: '$bg-skeleton',
  borderRadius: '0.5rem',
});

export default PostThumbnail;

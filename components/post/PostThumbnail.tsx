import Image from 'next/image';

import useNextImageLoading from '@/hooks/useNextImageLoading';
import { css } from '@/styles/_stitches.config';
import type { Post } from '@/types';

type Props = Pick<Post, 'thumbnail'>;

function PostThumbnail({ thumbnail }: Props) {
  const { isLoadingComplete, onLoadingComplete, onError } =
    useNextImageLoading();

  return (
    <div className={block()}>
      <Image
        className={thumbnailBlock()}
        src={thumbnail}
        alt={thumbnail}
        layout="fill"
        sizes="768px"
        onLoadingComplete={onLoadingComplete}
        onError={onError}
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
  zIndex: '$thumbnail',
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
  borderRadius: '0.5rem',
  background: '$bg-skeleton',
});

export default PostThumbnail;

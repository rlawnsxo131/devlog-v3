import useImageOnLoadingComplete from '@/hooks/useImageOnLoadingComplete';
import { utils } from '@/lib';
import { css } from '@/styles/_stitches.config';
import { Post } from '@/types';
import Image from 'next/image';
import PostThumbnailSkeleton from './PostThumbnailSkeleton';

type Props = Pick<Post, 'thumbnail'>;

function PostThumbnail({ thumbnail }: Props) {
  const { isLoadingComplete, onLoadingComplete } = useImageOnLoadingComplete();

  return (
    <div className={block()}>
      <Image
        src={utils.optimizeImage(thumbnail, 768)}
        alt="post-thumbnail"
        layout="fill"
        loading="lazy"
        onLoadingComplete={onLoadingComplete}
      />
      {!isLoadingComplete && <PostThumbnailSkeleton />}
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
  '& img': {
    position: 'absolute !important',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    borderRadius: '0.5rem',
    objectFit: 'cover',
    zIndex: '$thumbnail',
  },
});

export default PostThumbnail;

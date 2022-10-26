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
  width: '100%',
  '& span': {
    position: 'unset !important',
  },
  '& img': {
    width: '100% !important',
    height: 'auto !important',
    position: 'relative !important',
    borderRadius: '0.5rem',
    objectFit: 'contain',
  },
});

export default PostThumbnail;

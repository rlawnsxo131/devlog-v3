import Image from 'next/image';

import { css } from '@/styles/_stitches.config';
import type { Post } from '@/types';

type Props = Pick<Post, 'thumbnail' | 'thumbnailBlurData'>;

function PostThumbnail({ thumbnail, thumbnailBlurData }: Props) {
  return (
    <div className={block()}>
      <Image
        src={thumbnail}
        alt={thumbnail}
        layout="fill"
        loading="lazy"
        placeholder="blur"
        blurDataURL={thumbnailBlurData}
        sizes="768px"
      />
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

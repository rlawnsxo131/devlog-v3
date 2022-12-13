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
        className={thumbnailBlock({
          variant: isLoadingComplete ? 'visible' : 'default',
        })}
        src={thumbnail}
        alt={thumbnail}
        layout="fill"
        loading="lazy"
        onLoadingComplete={onLoadingComplete}
      />
      <div
        className={thumbnailSkeleton({
          variant: isLoadingComplete ? 'hidden' : 'default',
        })}
      />
    </div>
  );
}

const imageFadeTransition = {
  willChange: 'opacity',
  transition: 'opacity 0.25s linear',
};

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
  ...imageFadeTransition,
  transform: 'translateZ(0)',
  borderRadius: '0.5rem',
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
  variants: {
    variant: {
      default: {
        opacity: '0',
      },
      visible: {
        opacity: '1',
      },
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

const thumbnailSkeleton = css({
  ...imageFadeTransition,
  display: 'block',
  position: 'absolute',
  top: '0',
  left: '0',
  width: '100%',
  height: '100%',
  background: '$bg-skeleton',
  borderRadius: '0.5rem',
  variants: {
    variant: {
      default: {
        opacity: '1',
      },
      hidden: {
        opacity: '0',
      },
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export default PostThumbnail;

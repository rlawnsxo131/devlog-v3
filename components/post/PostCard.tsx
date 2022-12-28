import Image from 'next/image';
import Link from 'next/link';
import type { MouseEvent } from 'react';

import useNextImageLoading from '@/hooks/useNextImageLoading';
import { formatDate } from '@/lib/utils';
import { css } from '@/styles/_stitches.config';
import { buttonBasicStyle, textWrapBasicStyle } from '@/styles/basicStyle';
import type { Post } from '@/types';

import { LinkIcon } from '../img/icons';
import Separator from '../system/Separator';
import UnderlineLink from '../system/UnderlineLink';

interface Props {
  post: Post;
  onCopyToClipboard: (e: MouseEvent<HTMLButtonElement>) => Promise<void>;
}

function PostCard({ post, onCopyToClipboard }: Props) {
  const { isLoadingComplete, onLoadingComplete, onError } =
    useNextImageLoading();

  return (
    <article className={block()}>
      <div className={thumbnail()}>
        <Link href={`/post/${post.slug}`}>
          <a>
            <Image
              src={post.thumbnail}
              alt={post.thumbnail}
              layout="fill"
              sizes="(max-width: 599px) 100vw,
              (max-width: 1199px) 50vw,
              (max-width: 1439px) 33vw,
              25vw"
              onLoadingComplete={onLoadingComplete}
              onError={onError}
            />
            {!isLoadingComplete && <div className={thumbnailSkeleton()} />}
          </a>
        </Link>
      </div>
      <div className={content()}>
        <Link href={`/post/${post.slug}`}>
          <a>
            <h4>{post.title}</h4>
            <p>{post.description}</p>
          </a>
        </Link>
      </div>
      <div className={footer()}>
        <Link href={`/post/${post.slug}`}>
          <a>
            <div className={footerTextBlock()}>
              <span className="john">John</span>
              <Separator
                cssProps={{
                  margin: '0 0.25rem',
                  fontWeight: 'bold',
                  fontSize: '1rem',
                }}
              />
              <time>{formatDate(post.date)}</time>
            </div>
          </a>
        </Link>
        <div className={footerLinkItemBlock()}>
          <div className={footerTagsBlock()}>
            {post.tags.map((tag) => (
              <UnderlineLink key={tag} href={`/posts/${tag}`}>
                #{tag}
              </UnderlineLink>
            ))}
          </div>
          <button
            type="button"
            area-label="share"
            data-title={post.title}
            data-description={post.description}
            data-slug={post.slug}
            className={footerCopyLinkButton()}
            onClick={onCopyToClipboard}
          >
            <LinkIcon />
          </button>
        </div>
      </div>
    </article>
  );
}

const block = css({
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  borderRadius: '0.5rem',
  '& a': {
    flex: '1 1 0%',
  },
});

const thumbnail = css({
  width: '100%',
  height: '52.19206680584551%',
  overflow: 'hidden',
  borderRadius: '0.5rem',
  isolation: 'isolate',
  zIndex: '$thumbnail',
  '& a': {
    position: 'relative',
    width: '100%',
    height: '100%',
    flex: '1 1 0',
    display: 'block',
  },
  '& img, svg': {
    position: 'absolute',
    display: 'block',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: '0.5rem',
  },
  '@m1': {
    '&:hover': {
      '& img, svg': {
        transition: '0.25s ease-in',
        transform: 'scale(1.1) translate3d(0, 0, 0)',
      },
    },
    '&:not(:hover)': {
      '& img, svg': {
        transition: 'transform 0.25s ease-out',
      },
    },
  },
});

const thumbnailSkeleton = css({
  position: 'absolute',
  display: 'block',
  top: '0',
  left: '0',
  width: '100%',
  height: '100%',
  background: '$bg-skeleton',
});

const content = css({
  flex: '1 1 0',
  display: 'flex',
  flexDirection: 'column',
  '& h4, p': {
    ...textWrapBasicStyle,
  },
  '& h4': {
    margin: '1rem 0 0 0',
    fontSize: '1rem',
    fontWeight: '500',
    lineClamp: '1',
    '-webkit-line-clamp': 1,
  },
  '& p': {
    height: '2.125rem',
    margin: '0.5rem 0 0 0',
    fontSize: '0.875rem',
    fontWeight: '400',
    color: '$text-sub',
    lineClamp: '1',
    '-webkit-line-clamp': 2,
  },
});

const footer = css({
  flex: '1 1 0',
  display: 'flex',
  flexDirection: 'column',
  paddingTop: '1rem',
  '& a': {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    fontSize: '0.875rem',
  },
  '& span, time': {
    fontSize: '0.875rem',
    color: '$text-sub',
  },
});

const footerTextBlock = css({
  display: 'flex',
  '& .john': {
    color: '$text',
  },
});

const footerLinkItemBlock = css({
  flex: '1 1 0',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

const footerTagsBlock = css({
  display: 'flex',
  '& a + a': {
    marginLeft: '0.5rem',
  },
});

const footerCopyLinkButton = css({
  ...buttonBasicStyle,
  background: 'none',
  display: 'flex',
  alignItems: 'center',
  padding: '0 0.25rem',
});

export default PostCard;

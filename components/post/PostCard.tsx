import { optimizeImage } from '@/lib/utils';
import { buttonBasicStyle, textWrapBaseStyle } from '@/styles/basicStyle';
import { css } from '@/styles/_stitches.config';
import { Post } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';
import { LinkIcon } from '../img/icons';
import PostCardImageSkeleton from './PostCardImageSkeleton';
import usePostCard from './hooks/usePostCard';

interface Props {
  post: Post;
}

function PostCard({ post }: Props) {
  const { isLoadingImageComplete, onLoadingComplete, onCopyURLToClipboard } =
    usePostCard();

  return (
    <article className={block()}>
      <div className={thumbnail()}>
        <Link href={`/post/${post.slug}`}>
          <a>
            <Image
              src={optimizeImage(post.thumbnail, 640)}
              alt="post-thumbnail"
              layout="fill"
              loading="lazy"
              onLoadingComplete={onLoadingComplete}
            />
            {!isLoadingImageComplete && <PostCardImageSkeleton />}
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
              <span className="separator">·</span>
              <time>{format(new Date(post.date), 'yyyy-MM-dd')}</time>
            </div>
          </a>
        </Link>
        <div className={footerLinkItemBlock()}>
          <div className={footerTagsBlock()}>
            {post.tags.map((tag) => (
              <Link key={`${post.slug}_${tag}`} href={`/posts/${tag}`}>
                <a>#{tag}</a>
              </Link>
            ))}
          </div>
          <button
            type="button"
            value={post.slug}
            className={footerCopyLinkButton()}
            onClick={onCopyURLToClipboard}
          >
            <LinkIcon />
          </button>
        </div>
      </div>
    </article>
  );
}

const block = css({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  borderRadius: '0.5rem',
  '& a': {
    flex: '1 1 0',
  },
  '&:hover': {
    '& img, svg': {
      transition: '0.25s ease-in',
      transform: 'scale(1.1)',
    },
  },
  '&:not(:hover)': {
    '& img, svg': {
      transition: 'transform 0.25s ease-out',
    },
  },
});

const thumbnail = css({
  position: 'relative',
  width: '100%',
  height: '52.19206680584551%',
  overflow: 'hidden',
  borderRadius: '0.5rem',
  '& a': {
    flex: '1 1 0',
    display: 'block',
    position: 'relative',
    width: '100%',
    height: '100%',
  },
  '& img, svg': {
    position: 'absolute',
    display: 'block',
    left: '0',
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: '0.5rem',
  },
});

const content = css({
  flex: '1 1 0',
  display: 'flex',
  flexDirection: 'column',
  '& h4, p': {
    ...textWrapBaseStyle,
  },
  '& h4': {
    margin: '1rem 0 0 0',
    fontSize: '1.125rem',
    fontWeight: '500',
    lineClamp: '1',
    '-webkit-line-clamp': 1,
  },
  '& p': {
    height: '2.125rem',
    margin: '0.5rem 0 0 0',
    fontSize: '0.875rem',
    fontWeight: '400',
    color: '$text-description',
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
    color: '$text-description',
  },
});

const footerTextBlock = css({
  display: 'flex',
  '& .john': {
    color: '$text',
  },
  '& .separator': {
    margin: '0 0.25rem',
    fontWeight: 'bold',
    fontSize: '1rem',
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
  '& a': {
    color: '$text-underline',
    '&:hover': {
      color: '$text-underline-hover',
      textDecoration: 'underline',
    },
  },
  'a + a': {
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

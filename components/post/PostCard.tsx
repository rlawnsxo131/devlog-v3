import { optimizeImage } from '@/lib/utils';
import { textWrapBaseStyle } from '@/styles/basicStyle';
import { css } from '@/styles/_stitches.config';
import { Post } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';

interface Props {
  post: Post;
}

function PostCard({ post }: Props) {
  return (
    <article className={block()}>
      <div className={thumbnail()}>
        <Link href={`/post/${post.slug}`}>
          <a>
            <Image
              src={optimizeImage(post.thumbnail, 640)}
              alt="post-thumbnail"
              layout="fill"
            />
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
            <div className={footerLinkItemBlock()}>
              <div className={footerTagsBlock()}>
                {post.tags.map((v) => (
                  <span key={`${post.slug}_${v}`}>#{v}</span>
                ))}
              </div>
            </div>
          </a>
        </Link>
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
      transform: 'scale(1.1)',
      transition: 'transform 0.25s ease-in',
    },
  },
  '&:not(:hover)': {
    transition: 'transform 0.25s ease-out',
  },
  // border: '1px solid black',
});

const thumbnail = css({
  position: 'relative',
  width: '100%',
  paddingTop: '52.19206680584551%',
  overflow: 'hidden',
  borderRadius: '0.5rem',
  '& img, svg': {
    borderRadius: '0.5rem',
    position: 'absolute',
    display: 'block',
    top: '-10%',
    left: '0',
    width: '100%',
    height: '100%',
    objectFit: 'cover',
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
  a: {
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
  alignItems: 'center',
});

const footerTagsBlock = css({
  display: 'flex',
  // alignItems: 'center',
  'span + span': {
    marginLeft: '0.5rem',
  },
});

export default PostCard;

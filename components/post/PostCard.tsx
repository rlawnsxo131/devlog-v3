import { optimizeImage } from '@/lib/utils';
import { css } from '@/styles/_stitches.config';
import { Post } from '@/types';
import Image from 'next/image';
import Link from 'next/link';

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
        <div className={footerTagBlock()}>
          {post.tags.map((v) => (
            <span key={`${post.slug}_${v}`}>{v}</span>
          ))}
        </div>
        <time>{post.date}</time>
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
  boxShadow: '$post-card',
  background: '$bg-content',
  transition: 'transform 0.25s ease-in',
  '&:hover': {
    '@medium': {
      transform: 'translateY(-0.5rem)',
    },
  },
});

const thumbnail = css({
  position: 'relative',
  width: '100%',
  paddingTop: '52.19206680584551%',
  '& img, svg': {
    position: 'absolute',
    display: 'block',
    top: '0',
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
    overflow: 'hidden',
    display: '-webkit-box',
    '-webkit-box-orient': 'vertical',
    wordBreak: 'break-word',
    overflowWrap: 'break-word',
    textOverflow: 'ellipsis',
  },
  '& h4': {
    margin: '0',
    fontSize: '1.125rem',
    fontWeight: '500',
    lineClamp: '1',
    '-webkit-line-clamp': 1,
  },
  '& p': {
    margin: '0.875rem 0 0 0',
    display: 'block',
    height: '2.5rem',
    lineHeight: '1.5',
    fontSize: '0.875rem',
    lineClamp: '2',
    '-webkit-line-clamp': 2,
    color: '$text-description',
  },
  '& a': {
    padding: '0.875rem 0.875rem 0 0.875rem',
  },
});

const footer = css({
  flex: '1 1 0',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  padding: '1rem',
});

const footerTagBlock = css({
  display: 'flex',
  'span + span': {
    marginLeft: '0.5rem',
  },
});

export default PostCard;

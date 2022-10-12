import { optimizeImage } from '@/lib/utils';
import { css } from '@/styles/_stitches.config';
import { Post } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { HumanIcon } from '../img/icons';

interface Props {
  post: Post;
}

function PostCard({ post }: Props) {
  return (
    <article className={block()}>
      <div className={content()}>
        <Link href={`/post/${post.slug}`}>
          <a>
            <div className={john()}>
              <HumanIcon />
              <span>by John</span>
            </div>
            <h4>{post.title}</h4>
            <p>{post.description}</p>
            <time>{post.date}</time>
          </a>
        </Link>
      </div>
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
    </article>
  );
}

const block = css({
  position: 'relative',
  display: 'flex',
  width: '256px',
  height: '8.375rem',
  '& + &': {
    marginLeft: '1rem',
  },
  //   '&:hover': {
  //     cursor: 'pointer',
  //     '@medium': {
  //       transform: 'translateY(-0.5rem)',
  //     },
  //   },
});

const content = css({
  flex: '3 1 0',
  display: 'flex',
  flexDirection: 'column',
  marginRight: '1.25rem',
  overflow: 'hidden',
  '& h4': {
    margin: '0.5rem 0 1rem 0',
    fontSize: '1.375rem',
    fontWeight: 'bold',
    overflow: 'hidden',
    lineClamp: '1',
    display: '-webkit-box',
    '-webkit-line-clamp': 1,
    '-webkit-box-orient': 'vertical',
    wordBreak: 'break-word',
    overflowWrap: 'break-word',
    textOverflow: 'ellipsis',
  },
  '& p': {
    margin: 0,
    height: '6.7rem',
    lineHeight: '1.75',
    fontSize: '1rem',
    overflow: 'hidden',
    lineClamp: '2',
    display: '-webkit-box',
    '-webkit-line-clamp': 2,
    '-webkit-box-orient': 'vertical',
    wordBreak: 'break-word',
    overflowWrap: 'break-word',
    textOverflow: 'ellipsis',
  },
});

const thumbnail = css({
  flex: '1 1 0',
  position: 'relative',
  padding: '1rem',
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

const john = css({
  display: 'flex',
  alignItems: 'flex-end',
  gap: '0.5rem',
});

export default PostCard;

import Link from 'next/link';

import { css } from '@/styles/_stitches.config';
import {
  textUnderlineForHoverBasicStyle,
  textWrapBasicStyle,
} from '@/styles/basicStyle';
import type { LinkedPost } from '@/types';

interface Props {
  linkedPost: LinkedPost;
}

function PostLinked({ linkedPost }: Props) {
  const { prevPost, nextPost } = linkedPost;

  if (!prevPost && !nextPost) return null;

  return (
    <div className={block()}>
      <div className={linkBlock()}>
        {prevPost && (
          <Link href={`/post/${prevPost.slug}`}>
            <a className={anchor()}>
              <div className={description()}>이전 포스트</div>
              <div className={postTitle()}>{prevPost.title}</div>
            </a>
          </Link>
        )}
      </div>
      <div
        className={linkBlock({
          variant: 'end',
        })}
      >
        {nextPost && (
          <Link href={`/post/${nextPost.slug}`}>
            <a className={anchor()}>
              <div className={description()}>다음 포스트</div>
              <div className={postTitle()}>{nextPost.title}</div>
            </a>
          </Link>
        )}
      </div>
    </div>
  );
}

const block = css({
  display: 'flex',
  flexDirection: 'column-reverse',
  marginBottom: '2.5rem',

  '@s1': {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

const linkBlock = css({
  flex: '1 1 0',

  '@xxxs': {
    marginTop: '1.5rem',
  },
  '@s1': {
    flexDirection: 'row',
    '& + &': {
      marginLeft: '3rem',
    },
  },
});

const anchor = css({
  ...textUnderlineForHoverBasicStyle,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  height: '4rem',
  padding: '0 1rem',
  background: '$bg-content-sub2',
  boxShadow: '$default1',
  borderRadius: '4px',
  variants: {
    variant: {
      start: {
        alignItems: 'flex-start',
      },
      end: {
        alignItems: 'flex-end',
      },
    },
  },
  defaultVariants: {
    variant: 'start',
  },
});

const description = css({
  fontSize: '0.75rem',
  fontWeight: 'bold',
});

const postTitle = css({
  ...textWrapBasicStyle,
  lineClamp: '1',
  '-webkit-line-clamp': 1,
  margin: '0.25rem 0 0 0',
});

export default PostLinked;

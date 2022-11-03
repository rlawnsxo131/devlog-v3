import Link from 'next/link';
import { useEffect } from 'react';

import { utils } from '@/lib';
import { css } from '@/styles/_stitches.config';
import { linkTagBaseStyle } from '@/styles/basicStyle';
import type { CountTag } from '@/types';

import usePostCountTags from './hooks/usePostCountTags';
import PostCountTag from './PostCountTag';

interface Props {
  countTag: CountTag;
  currentTag?: string;
}

function PostCountTags({ countTag, currentTag }: Props) {
  const entries = Object.entries(countTag);
  const { containerRef, scrollToCenter } = usePostCountTags();

  return (
    <div className={block()} ref={containerRef}>
      <PostCountTag
        title="All"
        path="/"
        count={entries.length}
        isActive={!currentTag}
        scrollToCenter={scrollToCenter}
      />
      {entries.map(([tag, count]) => (
        <PostCountTag
          key={tag}
          title={tag}
          path={`/posts/${tag}`}
          count={count}
          isActive={tag === currentTag}
          scrollToCenter={scrollToCenter}
        />
      ))}
    </div>
  );
}

const block = css({
  display: 'flex',
  alignItems: 'center',
  height: '3.25rem',
  overflowX: 'auto',
});

const anchor = css({
  ...linkTagBaseStyle,
  marginBottom: '0.5rem',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'space-between',
  borderWidth: '2px',
  borderStyle: 'solid',
  '& span': {
    color: '$cyan9',
    marginLeft: '0.35rem',
  },
  variants: {
    variant: {
      default: {
        borderColor: '$bg-content',
        '&:hover': {
          borderColor: '$bg-content-hover',
        },
      },
      active: {
        borderColor: '$cyan9',
      },
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export default PostCountTags;

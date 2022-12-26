import { css } from '@/styles/_stitches.config';
import type { CountTag } from '@/types';

import usePostCountTags from './hooks/usePostCountTags';
import PostCountTag from './PostCountTag';

interface Props {
  allPostsCount: number;
  countTag: CountTag;
  currentTag?: string;
}

function PostCountTags({ allPostsCount, countTag, currentTag }: Props) {
  const entries = Object.entries(countTag);
  const { containerRef, scrollToCenter } = usePostCountTags();

  return (
    <div className={block()} ref={containerRef}>
      <PostCountTag
        title="All"
        path="/"
        count={allPostsCount}
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
  height: '4rem',
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  overflowX: 'auto',
  zIndex: '$post-count-tags',
  background: '$bg',

  '@xs4': {
    height: '5rem',
  },
});

export default PostCountTags;

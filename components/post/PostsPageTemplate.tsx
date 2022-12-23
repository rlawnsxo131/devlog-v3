import { css } from '@/styles/_stitches.config';
import type { CountTag, PostWithThumbnailBlurData } from '@/types';

import { ErrorScreen } from '../error';
import usePostsPageTemplate from './hooks/usePostsPageTemplate';
import PostCard from './PostCard';
import PostCardGridLayout from './PostCardGridLayout';
import PostCountTags from './PostCountTags';

interface Props {
  allPostsCount: number;
  posts: PostWithThumbnailBlurData[];
  countTag: CountTag;
  currentTag?: string;
}

function PostsPageTemplate({
  allPostsCount,
  posts,
  countTag,
  currentTag,
}: Props) {
  const { handleCopyToClipboard } = usePostsPageTemplate();

  return (
    <div className={block()}>
      <PostCountTags
        allPostsCount={allPostsCount}
        countTag={countTag}
        currentTag={currentTag}
      />
      <div className={postCardsBlock()}>
        {posts.length ? (
          <PostCardGridLayout>
            {posts.map((post) => (
              <PostCard
                key={post.slug}
                post={post}
                onCopyToClipboard={handleCopyToClipboard}
              />
            ))}
          </PostCardGridLayout>
        ) : (
          <ErrorScreen type="NotFound" />
        )}
      </div>
    </div>
  );
}

const block = css({
  flex: '1 1 0',
  display: 'flex',
  flexDirection: 'column',
});

const postCardsBlock = css({
  flex: '1 1 0',
  marginTop: '1.725rem',
});

export default PostsPageTemplate;

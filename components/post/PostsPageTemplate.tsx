import { css } from '@/styles/_stitches.config';
import { CountTag, Post } from '@/types';
import { ErrorScreen } from '../error';
import PostCard from './PostCard';
import PostCardGirdLayout from './PostCardGirdLayout';
import PostCountTags from './PostCountTags';

interface Props {
  posts: Post[];
  countTag: CountTag;
  currentTag?: string;
}

function PostsPageTemplate({ posts, countTag, currentTag }: Props) {
  return (
    <div className={block()}>
      <PostCountTags countTag={countTag} currentTag={currentTag} />
      <div className={postCardsBlock()}>
        {posts.length ? (
          <PostCardGirdLayout>
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </PostCardGirdLayout>
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

import { css } from '@/styles/_stitches.config';
import { CountTag, Post } from '@/types';
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
        <PostCardGirdLayout>
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </PostCardGirdLayout>
      </div>
    </div>
  );
}

const block = css({
  display: 'flex',
  flexDirection: 'column',
});

const postCardsBlock = css({
  marginTop: '1.725rem',
});

export default PostsPageTemplate;

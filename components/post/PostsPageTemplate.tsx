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
        {posts.length ? (
          <PostCardGirdLayout>
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </PostCardGirdLayout>
        ) : (
          <div className={emptyBlock()}>empty</div>
        )}
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

const emptyBlock = css({
  flex: '1',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  '& svg': {
    width: '20rem',
    height: 'auto',
  },
  '& .empty-button-block': {
    marginTop: '4rem',
  },
});

export default PostsPageTemplate;

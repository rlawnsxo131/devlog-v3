import { css } from '@stitches/core';
import { GetStaticProps } from 'next';
import { CountTag, Post } from '@/types';
import { PostCard, PostCardGirdTemplate } from '@/components/post';
import { getAllPosts } from '@/lib';
import PostCountTags from '@/components/post/PostCountTags';
import getUniqCountTagsFor from '@/lib/getUniqCountTagsFor';

interface Props {
  posts: Post[];
  countTags: CountTag;
}

export default function IndexPage({ posts, countTags }: Props) {
  return (
    <div className={block()}>
      <PostCountTags countTags={countTags} />
      <PostCardGirdTemplate>
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </PostCardGirdTemplate>
    </div>
  );
}

const block = css({
  display: 'flex',
  flexDirection: 'column',
});

export const getStaticProps: GetStaticProps = async () => {
  const posts = await getAllPosts();
  const countTags = getUniqCountTagsFor(posts);

  return {
    props: {
      posts,
      countTags,
    },
  };
};

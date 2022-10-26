import { css } from '@stitches/core';
import { GetStaticProps } from 'next';
import { CountTag, Post } from '@/types';
import { PostCard, PostCardGirdLayout, PostCountTags } from '@/components/post';
import { getAllPosts } from '@/lib';
import { getUniqCountTagObjFor } from '@/lib';

interface Props {
  posts: Post[];
  countTagObj: CountTag;
}

export default function IndexPage({ posts, countTagObj }: Props) {
  return (
    <div className={block()}>
      <PostCountTags countTagObj={countTagObj} />
      <PostCardGirdLayout>
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </PostCardGirdLayout>
    </div>
  );
}

const block = css({
  display: 'flex',
  flexDirection: 'column',
});

export const getStaticProps: GetStaticProps = async () => {
  const posts = await getAllPosts();
  const countTagObj = getUniqCountTagObjFor(posts);

  return {
    props: {
      posts,
      countTagObj,
    },
  };
};

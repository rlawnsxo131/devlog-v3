import type { GetStaticProps } from 'next';

import { SEO } from '@/components/base';
import { PostsPageTemplate } from '@/components/post';
import { getAllPosts, getUniqcountTagFor } from '@/lib';
import { CountTag, Post } from '@/types';

interface Props {
  posts: Post[];
  countTag: CountTag;
}

export default function IndexPage({ posts, countTag }: Props) {
  return (
    <>
      <SEO
        description={`김준태 블로그(DevLog) - ${posts
          .slice(0, 11)
          .map((post) => post.title)
          .slice(0, 20)
          .join()}`}
        type="blog"
      />
      <PostsPageTemplate posts={posts} countTag={countTag} />
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const posts = await getAllPosts();
  const countTag = getUniqcountTagFor(posts);

  return {
    props: {
      posts,
      countTag,
    },
  };
};

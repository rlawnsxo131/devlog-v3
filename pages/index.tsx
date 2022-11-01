import { GetStaticProps } from 'next';
import { CountTag, Post } from '@/types';
import { getAllPosts } from '@/lib';
import { getUniqcountTagFor } from '@/lib';
import { PostsPageTemplate } from '@/components/post';
import { SEO } from '@/components/base';

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

import type { GetStaticProps } from 'next';

import AppMainResponsiveBox from '@/components/app/AppMainResponsiveBox';
import { SEO } from '@/components/base';
import { PostsPageTemplate } from '@/components/post';
import { getAllPosts, getUniqCountTagFor } from '@/lib/post';
import type { CountTag, Post } from '@/types';

interface Props {
  allPostsCount: number;
  posts: Post[];
  countTag: CountTag;
}

export default function IndexPage({ allPostsCount, posts, countTag }: Props) {
  return (
    <>
      <SEO
        description={`김준태 블로그(DevLog) - ${posts
          .slice(0, 11)
          .map((post) => post.title)
          .slice(0, 20)
          .join()}`}
        ogDescription="김준태 블로그(DevLog)"
        type="blog"
      />
      <AppMainResponsiveBox>
        <PostsPageTemplate
          allPostsCount={allPostsCount}
          posts={posts}
          countTag={countTag}
        />
      </AppMainResponsiveBox>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const posts = await getAllPosts();
  const countTag = getUniqCountTagFor(posts);

  return {
    props: {
      allPostsCount: posts.length,
      posts,
      countTag,
    },
  };
};

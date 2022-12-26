import type { GetStaticPaths, GetStaticProps } from 'next';

import { AppMainResponsiveBox } from '@/components/app';
import { SEO } from '@/components/base';
import { PostsPageTemplate } from '@/components/post';
import { SiteConfig } from '@/config';
import { getAllPosts, getUniqCountTagFor } from '@/lib/post';
import type { CountTag, Post } from '@/types';

interface Props {
  allPostsCount: number;
  posts: Post[];
  countTag: CountTag;
  currentTag: string;
}

export default function PostsOfTagPage({
  allPostsCount,
  posts,
  countTag,
  currentTag,
}: Props) {
  return (
    <>
      <SEO
        title={`${currentTag} - DevLog`}
        description={`김준태 블로그(DevLog) - ${currentTag} 에 관한 글목록`}
        url={`${SiteConfig.url}/posts/${currentTag}`}
        type="blog"
      />
      <AppMainResponsiveBox>
        <PostsPageTemplate
          allPostsCount={allPostsCount}
          posts={posts}
          countTag={countTag}
          currentTag={currentTag}
        />
      </AppMainResponsiveBox>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getAllPosts();
  const countTags = getUniqCountTagFor(posts);
  const paths = Object.keys(countTags).map((tag) => ({
    params: { tag },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
};

type StaticParams = {
  tag?: string;
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { tag = '' } = params as StaticParams;
  const allPosts = await getAllPosts();
  const countTag = getUniqCountTagFor(allPosts);
  const posts = allPosts.filter((posts) => posts.tags.includes(tag));

  return {
    props: {
      allPostsCount: allPosts.length,
      posts,
      countTag,
      currentTag: tag,
    },
  };
};

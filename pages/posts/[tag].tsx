import type { GetStaticPaths, GetStaticProps } from 'next';

import { SEO } from '@/components/base';
import { PostsPageTemplate } from '@/components/post';
import { SiteConfig } from '@/config';
import { getAllPosts, getUniqcountTagFor } from '@/lib';
import { CountTag, Post } from '@/types';

interface Props {
  posts: Post[];
  countTag: CountTag;
  currentTag: string;
}

export default function PostsOfTagPage({ posts, countTag, currentTag }: Props) {
  return (
    <>
      <SEO
        title={`${currentTag} - DevLog`}
        description={`김준태 블로그(DevLog) - ${currentTag} 에 관한 글목록`}
        url={`${SiteConfig.url}/posts/${currentTag}`}
        type="blog"
      />
      <PostsPageTemplate
        posts={posts}
        countTag={countTag}
        currentTag={currentTag}
      />
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getAllPosts();
  const countTags = getUniqcountTagFor(posts);
  const paths = Object.keys(countTags).map((tag) => ({
    params: { tag },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { tag } = params;
  const allPosts = await getAllPosts();
  const countTag = getUniqcountTagFor(allPosts);
  const posts = allPosts.filter((posts) => posts.tags.includes(tag as string));

  return {
    props: {
      posts,
      countTag,
      currentTag: tag,
    },
  };
};

import type { GetStaticPaths, GetStaticProps } from 'next';
import { getPlaiceholder } from 'plaiceholder';

import { SEO } from '@/components/base';
import { PostsPageTemplate } from '@/components/post';
import { SiteConfig } from '@/config';
import { getAllPosts, getUniqCountTagFor } from '@/lib/post';
import type { CountTag, PostWithThumbnailBlurData } from '@/types';

interface Props {
  allPostsCount: number;
  posts: PostWithThumbnailBlurData[];
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
      <PostsPageTemplate
        allPostsCount={allPostsCount}
        posts={posts}
        countTag={countTag}
        currentTag={currentTag}
      />
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
  const filterdPosts = allPosts.filter((posts) => posts.tags.includes(tag));

  const posts: PostWithThumbnailBlurData[] = [];
  for await (const post of filterdPosts) {
    const { base64 } = await getPlaiceholder(post.thumbnail);
    posts.push({
      ...post,
      thumbnailBlurData: base64,
    });
  }

  return {
    props: {
      allPostsCount: allPosts.length,
      posts,
      countTag,
      currentTag: tag,
    },
  };
};

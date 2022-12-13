import type { GetStaticProps } from 'next';
import { getPlaiceholder } from 'plaiceholder';

import { SEO } from '@/components/base';
import { PostsPageTemplate } from '@/components/post';
import { getAllPosts, getUniqCountTagFor } from '@/lib/post';
import type { CountTag, PostWithThumbnailBlurData } from '@/types';

interface Props {
  posts: PostWithThumbnailBlurData[];
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
        ogDescription="김준태 블로그(DevLog)"
        type="blog"
      />
      <PostsPageTemplate
        allPostsCount={posts.length}
        posts={posts}
        countTag={countTag}
      />
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const originPosts = await getAllPosts();
  const countTag = getUniqCountTagFor(originPosts);
  const posts: PostWithThumbnailBlurData[] = [];
  for await (const post of originPosts) {
    const { base64 } = await getPlaiceholder(post.thumbnail);
    posts.push({
      ...post,
      thumbnailBlurData: base64,
    });
  }

  return {
    props: {
      posts,
      countTag,
    },
  };
};

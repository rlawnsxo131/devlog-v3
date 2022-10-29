import { GetStaticProps } from 'next';
import { CountTag, Post } from '@/types';
import { generateRssFeed, getAllPosts } from '@/lib';
import { getUniqcountTagFor } from '@/lib';
import { PostsPageTemplate } from '@/components/post';

interface Props {
  posts: Post[];
  countTag: CountTag;
}

export default function IndexPage({ posts, countTag }: Props) {
  return <PostsPageTemplate posts={posts} countTag={countTag} />;
}

export const getStaticProps: GetStaticProps = async () => {
  const posts = await getAllPosts();
  const countTag = getUniqcountTagFor(posts);

  await generateRssFeed(posts);

  return {
    props: {
      posts,
      countTag,
    },
  };
};

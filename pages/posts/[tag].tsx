import { GetStaticPaths, GetStaticProps } from 'next';
import { PostsPageTemplate } from '@/components/post';
import { getAllPosts } from '@/lib';
import { getUniqcountTagFor } from '@/lib';
import { CountTag, Post } from '@/types';

interface Props {
  posts: Post[];
  countTag: CountTag;
  currentTag: string;
}

export default function PostsOfTagPage({ posts, countTag, currentTag }: Props) {
  return (
    <PostsPageTemplate
      posts={posts}
      countTag={countTag}
      currentTag={currentTag}
    />
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

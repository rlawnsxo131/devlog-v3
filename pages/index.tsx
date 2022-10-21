import { GetStaticProps } from 'next';
import { Post } from '@/types';
import { PostCard, PostCardGirdTemplate } from '@/components/post';
import { getAllPosts } from '@/lib';

interface Props {
  posts: Post[];
}

export default function IndexPage({ posts }: Props) {
  return (
    <PostCardGirdTemplate>
      {posts.map((post) => (
        <PostCard key={post.slug} post={post} />
      ))}
    </PostCardGirdTemplate>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const posts = await getAllPosts();

  return {
    props: {
      posts,
    },
  };
};

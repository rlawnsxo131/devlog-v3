import { GetStaticProps } from 'next';
import { Post } from '@/types';
import PostService from '@/services';
import { PostCard } from '@/components/post';
import { PostListLayout } from '@/components/layouts';

interface Props {
  posts: Post[];
}

export default function IndexPage({ posts }: Props) {
  return (
    <PostListLayout>
      {posts.map((post) => (
        <PostCard key={post.slug} post={post} />
      ))}
    </PostListLayout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const posts = PostService.getInstance().getAllPosts();
  console.log(posts);

  return {
    props: {
      posts,
    },
  };
};

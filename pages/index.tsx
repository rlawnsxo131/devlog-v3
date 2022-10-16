import { GetStaticProps } from 'next';
import { Post } from '@/types';
import PostService from '@/services';
import { PostCard, PostCardGridTemplate } from '@/components/post';

interface Props {
  posts: Post[];
}

export default function IndexPage({ posts }: Props) {
  return (
    <PostCardGridTemplate>
      {posts.map((post) => (
        <PostCard key={post.slug} post={post} />
      ))}
    </PostCardGridTemplate>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const posts = await PostService.getInstance().getAllPosts();

  return {
    props: {
      posts,
    },
  };
};

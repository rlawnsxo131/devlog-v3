import { GetStaticProps } from 'next';
import { Post } from '@/types';
import PostService from '@/services';
import { PostCard, PostListGridTemplate } from '@/components/post';

interface Props {
  posts: Post[];
}

export default function IndexPage({ posts }: Props) {
  return (
    <PostListGridTemplate>
      {posts.map((post) => (
        <PostCard key={post.slug} post={post} />
      ))}
    </PostListGridTemplate>
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

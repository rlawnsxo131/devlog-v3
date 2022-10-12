import { GetStaticProps } from 'next';
import { Post } from '@/types';
import PostService from '@/services';
import { PostCard } from '@/components/post';

interface Props {
  posts: Post[];
}

export default function IndexPage({ posts }: Props) {
  return (
    <div style={{ display: 'flex' }}>
      {posts.map((post) => (
        <PostCard key={post.slug} post={post} />
      ))}
    </div>
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

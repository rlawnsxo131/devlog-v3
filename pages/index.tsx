import { GetStaticProps } from 'next';
import { Post } from '@/types';
import { PostCard, PostCardGirdContainer } from '@/components/post';
import { GetAllPostService } from '@/services';

interface Props {
  posts: Post[];
}

export default function IndexPage({ posts }: Props) {
  return (
    <PostCardGirdContainer>
      {posts.map((post) => (
        <PostCard key={post.slug} post={post} />
      ))}
    </PostCardGirdContainer>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const posts = await GetAllPostService.getInstance().excute();

  return {
    props: {
      posts,
    },
  };
};

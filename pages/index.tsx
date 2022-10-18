import { GetStaticProps } from 'next';
import { Post } from '@/types';
import { PostCard, PostCardGridTemplate } from '@/components/post';
import { GetAllPostService } from '@/services';

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
  const posts = await GetAllPostService.getInstance().excute();

  return {
    props: {
      posts,
    },
  };
};

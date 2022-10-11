import { GetStaticPaths, GetStaticProps } from 'next';
import Button from '@/components/Button';
import { postHelper } from '@/lib';
import { Post } from '@/types';

interface Props {
  posts: Post[];
}

export default function HomePage({ posts }: Props) {
  return (
    <div>
      hello
      <Button>click</Button>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { id: '1' } }, { params: { id: '2' } }],
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async () => {
  const posts = await postHelper.getAllPosts();
  console.log(posts);

  return {
    props: {
      posts,
    },
  };
};

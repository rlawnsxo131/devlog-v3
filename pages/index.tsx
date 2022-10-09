import Button from '@/components/Button';
import { getAllPosts } from '@/lib';

export default function HomePage() {
  return (
    <div>
      hello
      <Button>click</Button>
    </div>
  );
}

export async function getStaticProps() {
  const posts = getAllPosts();

  return {
    props: {
      posts,
    },
  };
}

import { GetStaticPaths, GetStaticProps } from 'next';

export default function PostPage() {
  return <div>post page</div>;
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { slug: '1' } }, { params: { slug: '2' } }],
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  console.log(params);
  return {
    props: {},
  };
};

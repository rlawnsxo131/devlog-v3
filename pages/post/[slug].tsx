import { Post } from '@/types';
import { GetStaticPaths, GetStaticProps } from 'next';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';
import { MainContentLayout } from '@/components/layouts';
import { getAllPosts, parseMarkdownToMdx } from '@/lib';
import { MDXRemoteContainer } from '@/components/markdown';
import { PostDetailTemplate } from '@/components/post';

interface Props {
  post: Post;
  mdx: MDXRemoteSerializeResult;
}

export default function PostPage({ post, mdx }: Props) {
  return (
    <MainContentLayout>
      <PostDetailTemplate
        title={post.title}
        tags={post.tags}
        thumbnail={post.thumbnail}
        date={post.date}
      >
        <MDXRemoteContainer mdx={mdx} />
      </PostDetailTemplate>
    </MainContentLayout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getAllPosts();
  /**
   * [
   *  {
   *    params: {
   *      slug: 'slug'
   *    }
   *  }
   * ]
   */
  const slugs = posts.map((post) => ({
    params: { slug: post.slug },
  }));

  return {
    paths: slugs,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params;
  const posts = await getAllPosts();
  const post = posts.find((post) => post.slug === slug);
  if (post) {
    const mdx = await parseMarkdownToMdx(post.body);
    return {
      props: {
        post,
        mdx,
      },
    };
  }

  return {
    notFound: true,
  };
};

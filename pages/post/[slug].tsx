import { Post } from '@/types';
import { GetStaticPaths, GetStaticProps } from 'next';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';
import { AppMainContentWrapper } from '@/components/app';
import { getAllPosts, parseMarkdownToMdx } from '@/lib';
import { MDXRemoteContainer } from '@/components/markdown';
import { PostDetailTemplate, PostTocWeb } from '@/components/post';

interface Props {
  post: Post;
  mdx: MDXRemoteSerializeResult;
}

export default function PostPage({ post, mdx }: Props) {
  return (
    <AppMainContentWrapper>
      <PostDetailTemplate
        title={post.title}
        tags={post.tags}
        thumbnail={post.thumbnail}
        date={post.date}
      >
        <MDXRemoteContainer mdx={mdx} />
      </PostDetailTemplate>
      <PostTocWeb />
    </AppMainContentWrapper>
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
  const paths = posts.map((post) => ({
    params: { slug: post.slug },
  }));

  return {
    paths,
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

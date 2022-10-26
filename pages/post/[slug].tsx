import { Post } from '@/types';
import { GetStaticPaths, GetStaticProps } from 'next';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';
import { AppMainContentWrapper } from '@/components/app';
import { getAllPosts, parseMarkdownToMdx } from '@/lib';
import { MDXRemoteContainer } from '@/components/markdown';
import {
  PostLayout,
  PostHeader,
  PostThumbnail,
  PostToc,
} from '@/components/post';

interface Props {
  post: Post;
  mdx: MDXRemoteSerializeResult;
}

export default function PostPage({ post, mdx }: Props) {
  return (
    <AppMainContentWrapper>
      <PostLayout
        header={
          <PostHeader title={post.title} date={post.date} tags={post.tags} />
        }
        thumbnail={<PostThumbnail thumbnail={post.thumbnail} />}
        body={<MDXRemoteContainer mdx={mdx} />}
      />
      <PostToc />
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

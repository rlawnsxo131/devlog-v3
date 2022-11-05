import type { GetStaticPaths, GetStaticProps } from 'next';
import type { MDXRemoteSerializeResult } from 'next-mdx-remote';

import { AppMainContentWrapper } from '@/components/app';
import { SEO } from '@/components/base';
import { MDXRemoteContainer } from '@/components/markdown';
import {
  PostHeader,
  PostLayout,
  PostThumbnail,
  PostToc,
} from '@/components/post';
import ContactLinks from '@/components/system/ContactLinks';
import { SiteConfig } from '@/config';
import { getAllPosts, parseMarkdownToMdx } from '@/lib';
import { Post } from '@/types';

interface Props {
  post: Post;
  mdx: MDXRemoteSerializeResult;
}

export default function PostPage({ post, mdx }: Props) {
  return (
    <>
      <SEO
        title={`${post.title} - DevLog`}
        description={post.description}
        url={`${SiteConfig.url}/post/${post.slug}`}
        imageUrl={post.thumbnail}
        type="article"
      >
        <meta property="article:published_time" content={post.date} />
        <meta property="article:modified_time" content={post.date} />
        <meta property="article:author" content={`${SiteConfig.url}/info`} />
        {post.tags.map((tag) => (
          <meta key={tag} property="article:tag" content={tag} />
        ))}
      </SEO>
      <AppMainContentWrapper>
        <PostLayout
          header={
            <PostHeader title={post.title} date={post.date} tags={post.tags} />
          }
          thumbnail={<PostThumbnail thumbnail={post.thumbnail} />}
          body={<MDXRemoteContainer mdx={mdx} />}
          footer={<ContactLinks />}
        />
        <PostToc />
      </AppMainContentWrapper>
    </>
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

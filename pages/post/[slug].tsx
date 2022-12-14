import type { GetStaticPaths, GetStaticProps } from 'next';
import type { MDXRemoteSerializeResult } from 'next-mdx-remote';

import { AppMainContentBox, AppMainResponsiveBox } from '@/components/app';
import { ContactLinks, SEO } from '@/components/base';
import { MDXRemoteContainer } from '@/components/markdown';
import {
  PostComments,
  PostHeader,
  PostLayout,
  PostLinked,
  PostThumbnail,
  PostToc,
} from '@/components/post';
import { SiteConfig } from '@/config';
import { getAllPosts, getPostDataFor, parseMarkdownToMdx } from '@/lib/post';
import type { LinkedPost, Post } from '@/types';

interface Props {
  post: Post;
  mdx: MDXRemoteSerializeResult;
  linkedPost: LinkedPost;
}

export default function PostPage({ post, mdx, linkedPost }: Props) {
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
      <AppMainResponsiveBox>
        <AppMainContentBox>
          <PostLayout
            header={
              <PostHeader
                title={post.title}
                date={post.date}
                tags={post.tags}
              />
            }
            thumbnail={<PostThumbnail thumbnail={post.thumbnail} />}
            body={<MDXRemoteContainer mdx={mdx} />}
            footer={
              <>
                <PostLinked linkedPost={linkedPost} />
                <ContactLinks />
                <PostComments />
              </>
            }
          />
          <PostToc />
        </AppMainContentBox>
      </AppMainResponsiveBox>
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

type StaticParams = {
  slug: string;
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params as StaticParams;
  const posts = await getAllPosts();
  const { post, linkedPost } = await getPostDataFor(posts, slug);

  if (post) {
    const mdx = await parseMarkdownToMdx(post.body);
    return {
      props: {
        post: {
          ...post,
        },
        linkedPost: {
          ...linkedPost,
        },
        mdx,
      },
    };
  }

  return {
    notFound: true,
  };
};

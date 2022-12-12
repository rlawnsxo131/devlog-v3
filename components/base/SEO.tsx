import Head from 'next/head';

import { SiteConfig } from '@/config';

interface Props {
  children?: React.ReactNode;
  title?: string;
  description: string;
  ogDescription?: string;
  imageUrl?: string;
  author?: string;
  url?: string;
  type: string;
}

function SEO({
  children,
  title,
  description,
  ogDescription,
  imageUrl,
  url,
  type,
}: Props) {
  const siteUrl = url || SiteConfig.url;

  return (
    <Head>
      <title>{title || 'DevLog'}</title>
      <meta property="og:title" content={title || SiteConfig.title} />
      <meta property="og:description" content={ogDescription || description} />
      <meta property="og:image" content={imageUrl || SiteConfig.logoUrl} />
      <meta property="og:image:width" content="800" />
      <meta property="og:image:height" content="400" />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={siteUrl} />
      {/* @TODO: site_name 을 넣을까 말까 */}
      {/* <meta property='og:site_name' content="김준태(john)의 개발 블로그(DevLog)" /> */}
      <meta name="description" content={description} />
      <link rel="canonical" href={siteUrl} />
      {children}
    </Head>
  );
}

export default SEO;

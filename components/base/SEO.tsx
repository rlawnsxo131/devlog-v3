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
  type?: string;
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
  return (
    <Head>
      <title>{title || 'DevLog'}</title>
      <meta property="og:title" content={title || SiteConfig.title} />
      <meta property="og:description" content={ogDescription || description} />
      <meta property="og:image" content={imageUrl || SiteConfig.logoUrl} />
      <meta property="og:image:width" content="800" />
      <meta property="og:image:height" content="400" />
      {type && <meta property="og:type" content={type} />}
      <meta name="description" content={description} />
      <link rel="canonical" href={url || SiteConfig.url} />
      {children}
    </Head>
  );
}

export default SEO;

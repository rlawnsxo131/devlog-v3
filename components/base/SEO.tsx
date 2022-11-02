import { SiteConfig } from 'config';
import Head from 'next/head';

interface Props {
  children?: React.ReactNode;
  title?: string;
  description: string;
  imageUrl?: string;
  author?: string;
  url?: string;
  type?: string;
}

function SEO({ children, title, description, imageUrl, url, type }: Props) {
  return (
    <Head>
      <title>{title || 'DevLog'}</title>
      <meta property="og:title" content={title || SiteConfig.title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl || SiteConfig.logoUrl} />
      <meta name="description" content={description} />
      <link rel="canonical" href={url || SiteConfig.url} />
      <meta property="og:type" content={type || 'blog'} />
      {children}
    </Head>
  );
}

export default SEO;

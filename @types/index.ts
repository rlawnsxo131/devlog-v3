export type Theme = 'light' | 'dark';

export interface FrontMatter {
  title: string;
  tags: string[];
  thumbnail: string;
  date: string;
  published: boolean;
  url_slug: string;
}

export interface Post {
  title: string;
  body: string;
  previewDescription: string;
  tags: string[];
  thumbnail: string;
  date: string;
  url_slug: string;
}

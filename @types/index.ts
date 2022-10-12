export type Theme = 'light' | 'dark';

export interface FrontMatter {
  title: string;
  tags: string[];
  thumbnail: string;
  date: string;
  published: boolean;
  slug: string;
}

export interface Post {
  title: string;
  body: string;
  description: string;
  tags: string[];
  thumbnail: string;
  date: string;
  slug: string;
}

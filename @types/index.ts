export type Theme = 'light' | 'dark';

export interface FrontMatter {
  title: string;
  description: string;
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

export interface CountTag {
  [index: string]: number;
}

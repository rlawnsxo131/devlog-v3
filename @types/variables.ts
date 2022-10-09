export type Theme = 'light' | 'dark';

export interface FrontMatter {
  title: string;
  tags: string[];
  published: boolean;
  date: string;
  thumbnail: string;
}

export interface Post {}

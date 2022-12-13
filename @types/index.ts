declare global {
  interface Window {
    gtag: (param1: string, param2: string, param3: object) => void;
  }
}

export type Theme = 'light' | 'dark';

export type ErrorType = 'NotFound' | 'InternalServerError' | 'Unknown';

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

export interface PostWithThumbnailBlurData extends Post {
  thumbnailBlurData: string;
}

export type CountTag = Record<string, number>;

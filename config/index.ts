const url =
  process.env.NODE_ENV === 'production'
    ? 'https://devlog.juntae.kim'
    : 'http://localhost:3000';

export const SiteConfig = {
  url: url,
  imageUrl: 'https://image-devlog.juntae.kim',
  title: 'DevLog',
  logoUrl: 'https://image-devlog.juntae.kim/logo/devlog.png',
  author: {
    name: 'Juntae(John) Kim',
    email: 'public.juntae@gmail.com',
    link: 'https://twitter.com/john_xxoo',
  },
};

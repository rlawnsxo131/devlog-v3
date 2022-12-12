const url =
  process.env.NODE_ENV === 'production'
    ? 'https://devlog.juntae.kim'
    : 'http://localhost:3000';

export const SiteConfig = {
  url: url,
  title: 'DevLog',
  logoUrl: 'https://devlog.juntae.kim/devlog.png',
  author: {
    name: 'Juntae(John) Kim',
    email: 'public.juntae@gmail.com',
    link: 'https://twitter.com/john_xxoo',
  },
};

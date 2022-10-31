import fs from 'fs';
import { Feed, Item } from 'feed';
import { marked } from 'marked';
import { Post } from '@/types';
import getAllPosts from '../lib/getAllPosts';

const PUBLIC_PATH = `${process.cwd()}/public`;
const NEXT_PUBLIC_SERVICE_URL = 'https://devlog.juntae.kim';
const NEXT_PUBLIC_IMAGE_URL = 'https://image-devlog.juntae.kim';

const author = {
  name: 'Juntae(John) Kim',
  email: 'public.juntae@gmail.com',
  link: 'https://twitter.com/john_xxoo',
};

function createFeeds(post: Post): Item {
  const link = `${NEXT_PUBLIC_SERVICE_URL}/post/${encodeURI(post.slug)}`;
  return {
    link,
    title: post.title,
    description: post.description.replace(/[\u001C-\u001F\u0008]/gi, ''),
    content: marked(post.body).replace(/[\u001C-\u001F\u0008]/gu, ''),
    id: link,
    date: new Date(post.date),
    author: [author],
    contributor: [author],
  };
}

function generateRssFeed(posts: Post[]) {
  const feed = new Feed({
    title: 'DevLog',
    description: 'DevLog',
    link: NEXT_PUBLIC_SERVICE_URL,
    id: NEXT_PUBLIC_SERVICE_URL,
    image: `${NEXT_PUBLIC_IMAGE_URL}/logo/devlog.png`,
    updated: new Date(posts[0].date),
    copyright: 'Copyright (C) 2020. DevLog. All rights reserved.',
    feed: `${NEXT_PUBLIC_SERVICE_URL}/rss`,
    author,
  });

  const postFeeds = posts.map(createFeeds);
  postFeeds.forEach(feed.addItem);

  // generate
  fs.mkdirSync(`${PUBLIC_PATH}/rss`, { recursive: true });
  fs.writeFileSync(`${PUBLIC_PATH}/rss/feed.xml`, feed.rss2());
  fs.writeFileSync(`${PUBLIC_PATH}/rss/atom.xml`, feed.atom1());
  fs.writeFileSync(`${PUBLIC_PATH}/rss/feed.json`, feed.json1());
}

getAllPosts()
  .then((posts) => {
    generateRssFeed(posts);
  })
  .then((_) => {
    console.log('rss creation complete');
  })
  .catch((err) => {
    console.error('rss creation fail');
    console.error(err);
  });

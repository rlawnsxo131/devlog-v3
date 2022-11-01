import fs from 'fs';
import { Feed, Item } from 'feed';
import { marked } from 'marked';
import { Post } from '@/types';
import getAllPosts from '../lib/getAllPosts';
import { SiteConfig } from 'config';

const PUBLIC_PATH = `${process.cwd()}/public`;

function createFeeds(post: Post): Item {
  const link = `${SiteConfig.url}/post/${encodeURI(post.slug)}`;
  return {
    link,
    title: post.title,
    description: post.description.replace(/[\u001C-\u001F\u0008]/gi, ''),
    content: marked(post.body).replace(/[\u001C-\u001F\u0008]/gu, ''),
    id: link,
    date: new Date(post.date),
    author: [SiteConfig.author],
    contributor: [SiteConfig.author],
  };
}

function generateRssFeed(posts: Post[]) {
  const feed = new Feed({
    title: 'DevLog',
    description: 'DevLog',
    link: SiteConfig.url,
    id: SiteConfig.url,
    image: SiteConfig.logoUrl,
    updated: new Date(posts[0].date),
    copyright: 'Copyright (C) 2020. DevLog. All rights reserved.',
    feed: `${SiteConfig.url}/rss`,
    author: SiteConfig.author,
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

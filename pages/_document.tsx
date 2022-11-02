import { Head, Html, Main, NextScript } from 'next/document';

import constants from '@/constants';
import { darkTheme, getCssText } from '@/styles/_stitches.config';

export default function Document() {
  const themeScript = `
    function initializeTheme() {
      const themeKey = localStorage['${constants.THEME_KEY}'];
      if (themeKey) {
        if (themeKey === "'dark'" || themeKey === 'dark' || themeKey === '"dark"') {
          document.documentElement.classList.add('${darkTheme}');
        } else {
          document.documentElement.classList.remove('${darkTheme}');
        }
        return;
      }
      
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.classList.add('${darkTheme}');
        return;
      }
      document.documentElement.classList.remove('${darkTheme}');
    }
    
    initializeTheme();
  `;

  return (
    <Html>
      <Head>
        <meta property="og:locale" content="ko-KR" />
        <meta property="og:type" content="website" />
        <meta name="author" content="john" />
        <meta name="robots" content="index, follow" />
        <meta
          name="theme-color"
          content="#ffffff"
          media="(prefers-color-scheme: light)"
        />
        <meta
          name="theme-color"
          content="#05a2c2"
          media="(prefers-color-scheme: dark)"
        />
        <link
          rel="alternate"
          type="application/rss+xml"
          title="rss"
          href="/rss/feed.xml"
        />
        <link
          rel="alternate"
          type="application/rss+json"
          title="rss"
          href="/rss/feed.json"
        />
        <link
          rel="alternate"
          type="application/rss+xml"
          title="rss"
          href="/rss/atom.xml"
        />
        <style
          id="stitches"
          dangerouslySetInnerHTML={{ __html: getCssText() }}
        />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

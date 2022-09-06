import { darkTheme, getCssText } from '@/styles/_stitches.config';
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  const themeScript = `
    if (localStorage.theme === '"dark"' || window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.classList.add('${darkTheme}');
    } else {
      document.documentElement.classList.remove('${darkTheme}')
    }
  `;

  return (
    <Html>
      <Head>
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

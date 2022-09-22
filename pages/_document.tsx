import { darkTheme, getCssText } from '@/styles/_stitches.config';
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  const themeScript = `
    function initializeTheme() {
      if (localStorage.theme) {
        if (localStorage.theme === '"dark"') {
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

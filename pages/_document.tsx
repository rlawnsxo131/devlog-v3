import { getCssText } from '@/styles/_stitches.config';
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  // document.documentElement.classList.add("dark")
  return (
    <Html>
      <Head>
        <style
          id="stitches"
          dangerouslySetInnerHTML={{ __html: getCssText() }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

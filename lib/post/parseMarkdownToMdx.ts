/**
 * @TODO
 * next-mdx-remote 를 lib/index.ts 에서 export 중이라,
 * lib 에서 끌어다 쓰는 코드가 있는 부분의 테스트가 깨지는데 이건 시간날때 수정하자.
 */
import { serialize } from 'next-mdx-remote/serialize';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeKatex from 'rehype-katex';
import prism from 'rehype-prism-plus';
import slug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import toc from 'remark-toc';
import type { Node } from 'unist';
import { visit } from 'unist-util-visit';

import imageMetadata from './imageMetadata';

// type TokenType =
//   | 'tag'
//   | 'attr-name'
//   | 'attr-value'
//   | 'deleted'
//   | 'inserted'
//   | 'punctuation'
//   | 'keyword'
//   | 'string'
//   | 'function'
//   | 'boolean'
//   | 'comment';

// const tokenClassNames: { [key in TokenType]: string } = {
//   tag: 'text-code-red',
//   'attr-name': 'text-code-yellow',
//   'attr-value': 'text-code-green',
//   deleted: 'text-code-red',
//   inserted: 'text-code-green',
//   punctuation: 'text-code-white',
//   keyword: 'text-code-purple',
//   string: 'text-code-green',
//   function: 'text-code-blue',
//   boolean: 'text-code-red',
//   comment: 'text-gray-400 italic',
// } as const;

function parseCodeSnippet() {
  return (tree: Node) => {
    visit(tree, 'element', (node: any) => {
      // const [token, type]: [string, TokenType] =
      //   node.properties.className || [];
      // if (token === 'token') {
      //   node.properties.className = [tokenClassNames[type]];
      // }
    });
  };
}

export default async function parseMarkdownToMdx(body: string) {
  return serialize(body, {
    mdxOptions: {
      remarkPlugins: [remarkMath, toc, remarkGfm],
      rehypePlugins: [
        slug,
        prism,
        rehypeAutolinkHeadings,
        rehypeKatex,
        parseCodeSnippet,
        imageMetadata(),
      ],
    },
  });
}

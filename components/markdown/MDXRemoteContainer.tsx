import type { MDXRemoteSerializeResult } from 'next-mdx-remote';
import { MDXRemote } from 'next-mdx-remote';
import { memo } from 'react';

import { css } from '@/styles/_stitches.config';

interface Props {
  mdx: MDXRemoteSerializeResult;
}

function MDXRemoteContainer({ mdx }: Props) {
  return (
    <div className={`${block()} mdx-remote-wrapper`}>
      <MDXRemote {...mdx} />
    </div>
  );
}

const block = css({
  /**
   * my custom
   */
  '& *': {
    lineHeight: '1.7',
  },

  color: '$text-markdown-description',

  '& a': {
    textDecoration: 'underline',
    color: '$text-underline',
    '&:hover': {
      color: '$text-underline-hover',
    },
  },

  '& img': {
    maxWidth: '100%',
    height: 'auto',
    display: 'block',
    margin: '1.5rem auto',
  },

  '& li': {
    '&::marker': {
      fontWeight: 'bold',
    },
  },

  '& li + li': {
    marginTop: '0.25rem',
  },

  '& pre': {
    background: '$bg-markdown-pre',
    padding: '1em',
    margin: '0.5em 0px',
    borderRadius: '0.5em',
    overflow: 'auto',
  },

  '& blockquote': {
    background: '$bg-markdown-pre',
    padding: '1.25em',
    margin: '0.5em 0px',
    overflow: 'auto',
    borderLeft: '5px solid $cyan9',
  },

  // inline code
  '& pre:not([class*="language-"]), code:not([class*="language-"])': {
    color: '$text-markdown-inline-code',
    background: '$bg-markdown-pre',
    fontWeight: '500',
    fontSize: '.875rem',
    padding: '0.25rem 0.3rem',
    borderRadius: '0.25rem',
    fontFamily:
      'ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace',
    '> *': {
      padding: '1rem 0.5rem',
      borderRadius: '0.25rem',
      color: '$text-markdown-description',
    },
  },

  /**
   * Inspired by gatsby remark prism - https://www.gatsbyjs.com/plugins/gatsby-remark-prismjs/
   * 1. Make the element just wide enough to fit its content.
   * 2. Always fill the visible space in .code-highlight.
   */
  '& .code-highlight': {
    display: 'block',
    // float: 'left' /* 1 */,
    // minWidth: '100' /* 2 */,
  },

  // '.code-line': {
  //   display: 'block',
  //   paddingLeft: '16px',
  //   paddingRight: '16px',
  //   marginLeft: '-16px',
  //   marginRight: '-16px',
  //   borderLeft:
  //     '4px solid rgba(0, 0, 0, 0)' /* Set placeholder for highlight accent border color to transparent */,
  // },

  // '.code-line.inserted': {
  //   backgroundColor:
  //     'rgba(16, 185, 129, 0.2)' /* Set inserted line (+) color */,
  // },

  // '.code-ine.deleted': {
  //   backgroundColor: 'rgba(239, 68, 68, 0.2)' /* Set deleted line (-) color */,
  // },

  // '.highlight-line': {
  //   marginLeft: '-16px',
  //   marginRight: '-16px',
  //   backgroundColor: 'red' /* Set highlight bg color */,
  //   borderLeft:
  //     '4px solid rgb(59, 130, 246)' /* Set highlight accent border color */,
  // },

  // '.line-number::before': {
  //   display: 'inline-block',
  //   width: '1rem',
  //   textAlign: 'right',
  //   marginRight: '16px',
  //   marginLeft: '-8px',
  //   color: 'rgb(156, 163, 175)' /* Line number color */,
  //   content: 'attr(line)',
  // },

  /**
   * code style start
   */
  '& code[class*="language-"], pre[class*="language-"]': {
    background: 'hsl(0deg 0% 14%)',
    color: 'hsl(0 0% 95% / 1)',
    fontFamily:
      'Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace' /* this is the default */,
    /* The following properties are standard, please leave them as they are */
    fontSize: '0.875rem',
    direction: 'ltr',
    textAlign: 'left',
    whiteSpace: 'pre',
    wordSpacing: 'normal',
    wordBreak: 'normal',
    lineHeight: '1.5',
    '-moz-tab-size': '2',
    '-o-tab-size': '2',
    tabSize: '2',
    /* The following properties are also standard */
    '-webkit-hyphens': 'none',
    '-moz-hyphens': 'none',
    '-ms-hyphens': 'none',
    hyphens: 'none',
    letterSpacing: '1px',
  },

  '& code[class*="language-"]::-moz-selection, code[class*="language-"] ::-moz-selection, pre[class*="language-"]::-moz-selection, pre[class*="language-"] ::-moz-selection':
    {
      background: '#eb64b927',
      color: 'inherit',
    },

  '& code[class*="language-"]::selection, code[class*="language-"] ::selection, pre[class*="language-"]::selection, pre[class*="language-"] ::selection':
    {
      background: '#eb64b927',
      color: 'inherit',
    },

  /* Properties specific to code blocks */
  '& pre[class*="language-"]': {
    padding: '1em' /* this is standard */,
    margin: '0.5em 0' /* this is the default */,
    overflow: 'auto' /* this is standard */,
    borderRadius: '0.5em',
  },

  /* Properties specific to inline code */
  '&:not(pre) > code[class*="language-"]': {
    padding: '0.2em 0.3em',
    borderRadius: '0.5rem',
    whiteSpace: 'normal' /* this is standard */,
  },

  '& .token.comment, .token.prolog, .token.cdata': {
    color: '#91889b',
  },

  '& .token.punctuation': {
    color: '#7b6995',
    fontWeight: 'bold',
  },

  '& .token.builtin, .token.constant, .token.boolean': {
    color: '#ffe261',
  },

  '& .token.number': {
    color: '#b381c5',
  },

  '& .token.important, .token.atrule, .token.property, .token.keyword': {
    color: '#40b4c4',
  },

  '& .token.doctype, .token.operator, .token.inserted, .token.tag, .token.class-name, .token.symbol':
    {
      color: '#74dfc4',
    },

  '& .token.attr-name, .token.function, .token.deleted, .token.selector': {
    color: '#eb64b9',
  },

  '& .token.attr-value, .token.regex, .token.char, .token.string': {
    color: '#b4dce7',
  },

  '& .token.entity, .token.url, .token.variable': {
    color: '#ffffff',
  },

  /* The following rules are pretty similar across themes, but feel free to adjust them */
  '& .token.bold': {
    fontWeight: 'bold',
  },

  '& .token.italic': {
    fontStyle: 'italic',
  },

  '& .token.entity': {
    cursor: 'help',
  },

  '& .token.namespace': {
    opacity: '0.7',
  },
});

export default memo(MDXRemoteContainer);

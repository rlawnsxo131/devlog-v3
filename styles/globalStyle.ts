import { globalCss } from './_stitches.config';

const topLevelBoxStyle = {
  margin: '0',
  padding: '0',
  height: '100%',
  scrollBehavior: 'smooth',
  scrollPadding: '5rem',
};

const topLevelBoxChildrenStyle = {
  boxSizing: 'inherit',
  fontFamily:
    'Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji',
  //'"Montserrat", sans-serif, -apple-system, BlinkMacSystemFont, "Helvetica Neue", "Apple SD Gothic Neo", "Malgun Gothic", "맑은 고딕", 나눔고딕, "Nanum Gothic", "Noto Sans KR", "Noto Sans CJK KR", arial, 돋움, Dotum, Tahoma, Geneva, sans-serif',

  textRendering: 'optimizeLegibility',
  'h1, h2, h3, h4, h5': {
    color: '$text',
  },

  '&::selection': {
    color: '$text-selection',
    background: '$cyan9',
  },
};

const globalStyle = globalCss({
  html: {
    ...topLevelBoxStyle,
    boxSizing: 'border-box',
    background: '$bg',
    '& *': {
      ...topLevelBoxChildrenStyle,
    },
  },
  body: {
    ...topLevelBoxStyle,
  },
  '#__next': {
    ...topLevelBoxStyle,
  },
  a: {
    cursor: 'pointer',
    textDecoration: 'none',
  },
});

export default globalStyle;

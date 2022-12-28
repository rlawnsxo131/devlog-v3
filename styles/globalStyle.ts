import { globalCss } from './_stitches.config';

const globalStyle = globalCss({
  'html, body, #__next': {
    margin: 0,
    padding: 0,
    height: '100%',
    background: '$bg',
  },

  html: {
    scrollPadding: '5rem',
    scrollBehavior: 'smooth',
    boxSizing: 'border-box',
    '*': {
      boxSizing: 'inherit',
      '-webkit-tap-highlight-color': 'transparent',
    },
  },

  body: {
    textRendering: 'optimizeLegibility',

    'h1, h2, h3, h4, h5': {
      color: '$text',
    },
    a: {
      cursor: 'pointer',
      textDecoration: 'none',
    },

    '*': {
      fontFamily:
        'Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji',
      // '"Montserrat", sans-serif, -apple-system, BlinkMacSystemFont, "Helvetica Neue", "Apple SD Gothic Neo", "Malgun Gothic", "맑은 고딕", 나눔고딕, "Nanum Gothic", "Noto Sans KR", "Noto Sans CJK KR", arial, 돋움, Dotum, Tahoma, Geneva, sans-serif',

      '&::selection': {
        color: '$text-selection',
        background: '$cyan9',
      },
    },
  },
});

export default globalStyle;

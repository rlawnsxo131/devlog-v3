import { globalCss } from './stitches.config';

export const globalStyles = globalCss({
  html: {
    margin: '0',
    padding: '0',
    height: '100%',
    boxSizing: 'border-box',
  },
  body: {
    margin: '0',
    padding: '0',
    height: '100%',
    '& *': {
      boxSizing: 'inherit',
      fontFamily:
        '"Montserrat", sans-serif, -apple-system, BlinkMacSystemFont, "Helvetica Neue", "Apple SD Gothic Neo", "Malgun Gothic", "맑은 고딕", 나눔고딕, "Nanum Gothic", "Noto Sans KR", "Noto Sans CJK KR", arial, 돋움, Dotum, Tahoma, Geneva, sans-serif',
      textRendering: 'optimizeLegibility',
    },
  },
  '#__next': {
    margin: '0',
    padding: '0',
    height: '100%',
  },
});

import { globalCss } from './_stitches.config';

const topLevelBoxStyle = {
  margin: '0',
  padding: '0',
  height: '100%',
};

const globalStyles = globalCss({
  html: {
    ...topLevelBoxStyle,
    boxSizing: 'border-box',
    '& *': {
      boxSizing: 'inherit',
      fontFamily:
        '"Montserrat", sans-serif, -apple-system, BlinkMacSystemFont, "Helvetica Neue", "Apple SD Gothic Neo", "Malgun Gothic", "맑은 고딕", 나눔고딕, "Nanum Gothic", "Noto Sans KR", "Noto Sans CJK KR", arial, 돋움, Dotum, Tahoma, Geneva, sans-serif',
      textRendering: 'optimizeLegibility',
      color: '$gray12',
      '&::selection': {
        color: '$whiteA12',
        background: '$cyan9',
      },
    },
    background: '$bg',
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

export default globalStyles;

import { createStitches } from '@stitches/react';
import palette from './palette';

export const { createTheme, globalCss, getCssText, css } = createStitches({
  theme: {
    colors: {
      ...palette,
    },
  },
  // media: {
  //   dark: '(prefers-color-scheme: dark)',
  // },
});

export const darkTheme = createTheme({
  colors: {
    ...palette,
  },
});

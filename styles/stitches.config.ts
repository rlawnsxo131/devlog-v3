import { createStitches } from '@stitches/react';

export const { createTheme, globalCss, getCssText, css } = createStitches({
  theme: {
    colors: {
      john: 'red',
    },
  },
  media: {
    dark: '(prefers-color-scheme: dark)',
  },
});

export const darkTheme = createTheme({
  colors: {
    john: 'blue',
  },
});

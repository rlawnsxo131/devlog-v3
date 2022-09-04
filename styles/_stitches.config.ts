import { createStitches } from '@stitches/react';

export const { createTheme, globalCss, getCssText, config, css } =
  createStitches({
    theme: {
      colors: {},
    },
    // media: {
    //   dark: '(prefers-color-scheme: dark)',
    // },
  });

export const darkTheme = createTheme({});

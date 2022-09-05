import { createStitches } from '@stitches/react';
import {
  gray,
  blue,
  red,
  green,
  grayDark,
  blueDark,
  redDark,
  greenDark,
} from '@radix-ui/colors';

export const { createTheme, globalCss, getCssText, config, css } =
  createStitches({
    theme: {
      colors: {
        ...gray,
        ...blue,
        ...red,
        ...green,
      },
    },
    // media: {
    //   dark: '(prefers-color-scheme: dark)',
    // },
  });

export const darkTheme = createTheme({
  colors: {
    ...grayDark,
    ...blueDark,
    ...redDark,
    ...greenDark,
  },
});

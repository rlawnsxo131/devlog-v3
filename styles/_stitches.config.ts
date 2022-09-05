import { createStitches } from '@stitches/react';
import {
  gray,
  red,
  green,
  grayDark,
  redDark,
  greenDark,
  cyan,
  cyanDark,
} from '@radix-ui/colors';

export const { createTheme, globalCss, getCssText, config, css } =
  createStitches({
    theme: {
      colors: {
        ...gray,
        ...cyan,
        ...red,
        ...green,
        bg_1: '$gray1',
      },
    },
    // media: {
    //   dark: '(prefers-color-scheme: dark)',
    // },
  });

export const darkTheme = createTheme('dark-theme', {
  colors: {
    ...grayDark,
    ...cyanDark,
    ...redDark,
    ...greenDark,
    bg_1: '$gray1',
  },
});

import { createStitches } from '@stitches/react';
import {
  whiteA,
  gray,
  red,
  green,
  grayDark,
  redDark,
  greenDark,
  cyan,
  cyanDark,
} from '@radix-ui/colors';

export const { createTheme, globalCss, getCssText, config, css, styled } =
  createStitches({
    theme: {
      colors: {
        ...whiteA,
        ...gray,
        ...cyan,
        ...red,
        ...green,
      },
    },
  });

export const darkTheme = createTheme('dark-theme', {
  colors: {
    ...whiteA,
    ...grayDark,
    ...cyanDark,
    ...redDark,
    ...greenDark,
  },
});

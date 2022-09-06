import { createStitches, CSS } from '@stitches/react';
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
    media: {
      xxxsmall: '(min-width: 0px)',
      xxsmall: '(min-width: 320px)',
      xsamll: '(min-width: 375px)',
      small: '(min-width: 768px)',
      medium: '(min-width: 1024px)',
    },
    utils: {
      mediaQuery: ({
        minWidth,
        styles,
      }: {
        minWidth: number;
        styles: CSS;
      }) => ({
        [`@media(min-width: ${minWidth}px)`]: {
          ...styles,
        },
      }),
    },
  });

export const darkTheme = createTheme('dark', {
  colors: {
    ...whiteA,
    ...grayDark,
    ...cyanDark,
    ...redDark,
    ...greenDark,
  },
});

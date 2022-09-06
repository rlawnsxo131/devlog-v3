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

export const { createTheme, globalCss, getCssText, config, css, keyframes } =
  createStitches({
    theme: {
      colors: {
        ...whiteA,
        ...gray,
        ...cyan,
        ...red,
        ...green,
        bg: '$gray2',
        'bg-primary': '$cyan9',
        'bg-primary-hover': '$cyan10',
        'bg-nav': '$gray2',
      },
      shadows: {
        headerNavigation: '1px 1px 3px 1px #adb5bd',
      },
      zIndices: {
        header: 10,
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
    bg: '$gray2',
    'bg-primary': '$cyan6',
    'bg-primary-hover': '$cyan7',
    'bg-nav': '$gray3',
  },
  shadows: {
    headerNavigation: '1px 1px 3px 1px #18191A',
  },
});

import { createStitches, CSS } from '@stitches/core';
import { gray, red, grayDark, redDark, cyan, cyanDark } from '@radix-ui/colors';

export const { createTheme, globalCss, getCssText, config, css, keyframes } =
  createStitches({
    theme: {
      colors: {
        ...gray,
        ...cyan,
        ...red,

        // custom
        white: '#FFFFFF',

        // background
        bg: '$white',
        'bg-nav': '$white',
        'bg-info-section': '$white',
        'bg-hover': '$cyan4',
        'bg-button-primary': '$cyan9',
        'bg-button-primary-hover': '$cyan10',

        // text
        text: '$gray12',
        'text-selection': '$white',
        'text-button': '$white',
        'text-anchor-active': '$cyan9',

        // fill
        'fill-content': '$gray12',
        'fill-background': '$white',
      },
      shadows: {
        default: '1px 1px 3px 1px #adb5bd',
        'header-navigation': '1px 1px 3px 1px #adb5bd',
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
    ...grayDark,
    ...cyanDark,
    ...redDark,

    // background
    bg: '$gray2',
    'bg-nav': '$gray3',
    'bg-info-section': '$gray3',
    'bg-hover': '$cyan4',
    'bg-button-primary': '$cyan6',
    'bg-button-primary-hover': '$cyan7',

    // text
    text: '$gray12',
    'text-selection': '$white',
    'text-button': '$white',
    'text-anchor-active': '$cyan9',

    // fill
    'fill-content': '$gray12',
    'fill-background': '$gray2',
  },
  shadows: {
    default: '1px 1px 3px 1px #18191A',
    'header-navigation': '1px 1px 3px 1px #18191A',
  },
});

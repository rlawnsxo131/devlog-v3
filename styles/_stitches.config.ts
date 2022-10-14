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
        'bg-content': '$white',
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
        'text-description': '$gray11',

        // fill
        'fill-content': '$gray12',
        'fill-background': '$white',
      },
      shadows: {
        default1: '1px 1px 3px 1px #adb5bd',
        default2: '1px 1px 5px 2px #F1F3F5',
        'header-navigation': '1px 1px 3px 1px #adb5bd',
      },
      zIndices: {
        header: 10,
      },
    },
    media: {
      xxxs: '(min-width: 0px)',
      xxs1: '(min-width: 320px)',
      xxs2: '(min-width: 345px)',
      xs1: '(min-width: 375px)',
      xs2: '(min-width: 420px)',
      xs3: '(min-width: 600px)',
      s1: '(min-width: 768px)',
      s2: '(min-width: 820px)',
      m1: '(min-width: 1024px)',
      m2: '(min-width: 1200px)',
      l1: '(min-width: 1440px)',
      l2: '(min-width: 1920px)',
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
    'bg-content': '$gray3',
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
    'text-description': '$gray11',

    // fill
    'fill-content': '$gray12',
    'fill-background': '$gray2',
  },
  shadows: {
    default1: '1px 1px 3px 1px #18191A',
    default2: 'none',
    'header-navigation': '1px 1px 3px 1px #18191A',
  },
});

import { cyan, cyanDark, gray, grayDark, red, redDark } from '@radix-ui/colors';
import type { CSS, ScaleValue } from '@stitches/core';
import { createStitches } from '@stitches/core';

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
        'bg-content': '$gray3',
        'bg-content-hover': '$gray5',

        'bg-nav': '$white',
        'bg-info-section': '$white',
        'bg-hover': '$cyan4',
        'bg-button-primary': '$cyan9',
        'bg-button-primary-hover': '$cyan10',
        'bg-skeleton': '$gray3',

        // text
        text: '$gray12',
        'text-sub': '$gray11',
        'text-selection': '$white',
        'text-button': '$white',
        'text-anchor-active': '$cyan10',
        'text-underline': '$cyan10',
        'text-underline-hover': '$cyan11',

        // fill
        'fill-content': '$gray12',
        'fill-background': '$white',

        // markdown
        'bg-markdown-pre': '$gray3',
        'bg-markdown-blockquote': '$gray3',
        'text-markdown-description': '$gray12',
        'text-markdown-inline-code': '$cyan11',
      },
      shadows: {
        default1: '1px 1px 3px 1px #adb5bd',
        default2: '1px 1px 5px 2px #F1F3F5',
        'header-navigation': '1px 1px 3px 1px #adb5bd',
      },
      zIndices: {
        header: 10,
        thumbnail: 8,
      },
    },
    media: {
      xxxs: '(min-width: 0px)',
      xxs1: '(min-width: 320px)',
      xxs2: '(min-width: 345px)',
      xs1: '(min-width: 375px)',
      xs2: '(min-width: 420px)',
      xs3: '(min-width: 600px)',
      xs4: '(min-width: 640px)',
      s1: '(min-width: 768px)',
      s2: '(min-width: 820px)',
      m1: '(min-width: 1025px)',
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
      marginX: (value: ScaleValue<'space'>) => ({
        marginLeft: value,
        marginRight: value,
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
    'bg-content': '$gray5',
    'bg-content-hover': '$gray7',
    'bg-nav': '$gray3',
    'bg-info-section': '$gray3',
    'bg-hover': '$cyan4',
    'bg-button-primary': '$cyan6',
    'bg-button-primary-hover': '$cyan7',
    'bg-skeleton': '$gray3',

    // text
    text: '$gray12',
    'text-sub': '$gray11',
    'text-selection': '$white',
    'text-button': '$white',
    'text-anchor-active': '$cyan9',
    'text-underline': '$cyan9',
    'text-underline-hover': '$cyan10',

    // fill
    'fill-content': '$gray12',
    'fill-background': '$gray2',

    // markdown
    'bg-markdown-pre': '$gray3',
    'bg-markdown-blockquote': '$gray3',
    'text-markdown-description': 'hsl(0 0% 70% / 1)',
    'text-markdown-inline-code': '$cyan9',
  },
  shadows: {
    default1: '1px 1px 3px 1px #18191A',
    default2: 'none',
    'header-navigation': '1px 1px 3px 1px #18191A',
  },
});

export type StitchesCSS = CSS<typeof config>;

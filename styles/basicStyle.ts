import type { StitchesCSS } from './_stitches.config';

export const buttonBasicStyle: StitchesCSS = {
  padding: '0',
  border: '0',
  boxSizing: 'border-box',
  lineHeight: 'normal',
  cursor: 'pointer',
};

export const buttonWithSVGBasicStyle: StitchesCSS = {
  background: 'inherit',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

export const layoutBasicResponsiveStyle: StitchesCSS = {
  '@xxxs': {
    width: '93%',
  },
  '@m1': {
    width: '768px',
  },
  '@m2': {
    width: '860px',
  },
  '@l1': {
    width: '1200px',
  },
};

export const textWrapBasicStyle: StitchesCSS = {
  overflow: 'hidden',
  display: '-webkit-box',
  '-webkit-box-orient': 'vertical',
  wordBreak: 'break-word',
  overflowWrap: 'break-word',
  textOverflow: 'ellipsis',
};

export const textUnderlineForHoverBasicStyle: StitchesCSS = {
  color: '$text-underline',
  '&:hover': {
    color: '$text-underline-hover',
    textDecoration: 'underline',
  },
};

export const linkTagBasicStyle: StitchesCSS = {
  padding: '0.25rem 1rem',
  background: '$bg-content',
  color: '$text',
  fontSize: '0.875rem',
  borderRadius: '0.3rem',
  '& + &': {
    marginLeft: '0.5rem',
  },
  '&:hover': {
    background: '$bg-content-hover',
  },
};

export const skeletonBasicStyle: StitchesCSS = {
  background: '$bg-skeleton',
  borderRadius: '0.5rem',
  transform: 'translateZ(0)',
  transition: 'opacity 0.25s linear',
  willChange: 'opacity',
  variants: {
    variant: {
      default: {
        opacity: '1',
      },
      hidden: {
        opacity: '0',
      },
    },
  },
  defaultVariants: {
    variant: 'default',
  },
};

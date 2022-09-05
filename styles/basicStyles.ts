import { css, VariantProps } from '@stitches/react';

export const basicButtonStyle = css({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '1rem',
  fontWeight: '600',
  borderRadius: '4px',
  variants: {
    size: {
      small: {},
      medium: {},
      large: {},
      responsive: {},
    },
  },
});
export type CSSBasicButtonVariants = VariantProps<typeof basicButtonStyle>;

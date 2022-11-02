import type { VariantProps } from '@stitches/core';
import { memo } from 'react';

import { css } from '@/styles/_stitches.config';
import { buttonBasicStyle } from '@/styles/basicStyle';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: VariantProps<typeof button>;
}

function Button({ children, variant, ...props }: Props) {
  return (
    <button type="button" className={button({ ...variant })} {...props}>
      {children}
    </button>
  );
}

const button = css({
  ...buttonBasicStyle,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontWeight: '600',
  borderRadius: '4px',
  color: '$text-button',
  variants: {
    variant: {
      primary: {
        background: '$bg-button-primary',
        border: '1px solid $bg-button-primary',
        '&:hover': {
          background: '$bg-button-primary-hover',
          border: '1px solid $bg-button-primary-hover',
        },
      },
      secondary: {},
    },
    size: {
      small: {
        height: '1.5rem',
        padding: '0 0.9375rem',
        fontSize: '0.75rem',
      },
      medium: {
        height: '2rem',
        padding: '0 1.25rem',
        fontSize: '1rem',
      },
      large: {
        height: '2.5rem',
        padding: '0 1.125rem',
        fontSize: '1.125rem',
      },
      responsive: {
        flex: '1',
        width: '100%',
        minHeight: '2.5rem',
        height: 'auto',
        fontSize: '1.125rem',
      },
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'medium',
  },
});

export default memo(Button);

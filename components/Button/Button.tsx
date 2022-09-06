import { buttonBasicStyles } from '@/styles/basicStyles';
import { css } from '@/styles/_stitches.config';
import { VariantProps } from '@stitches/react';

interface Props {
  children: React.ReactNode;
  variant?: VariantProps<typeof button>;
}

function Button({ children, variant }: Props) {
  return <button className={button({ ...variant })}>{children}</button>;
}

const button = css({
  ...buttonBasicStyles,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontWeight: '600',
  borderRadius: '4px',
  color: '$whiteA12',
  variants: {
    variant: {
      primary: {
        background: '$cyan9',
        border: '1px solid $cyan3',
        '&:hover': {
          background: '$cyan10',
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

export default Button;

import { css } from '@/styles/_stitches.config';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

function Button({ children }: ButtonProps) {
  return <button className={button()}>{children}</button>;
}

const button = css({
  // base styles
  color: '$blue7',
  variants: {
    variant: {
      primary: {},
      secondary: {},
    },
  },
});

export default Button;

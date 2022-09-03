import { css } from '@stitches/react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export default function Button({ children }: ButtonProps) {
  return <button className={button()}>{children}</button>;
}

const button = css({
  // base styles
  color: '$john',
  variants: {
    variant: {
      primary: {
        // primary styles
      },
      secondary: {
        // secondary styles
      },
    },
  },
});

import { css } from '@/styles/_stitches.config';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

function Button({ children }: ButtonProps) {
  return <button className={button()}>{children}</button>;
}

const aa = css({
  background: '$red9',
});
const button = css({
  // base styles
  ...aa,
  color: '$cyan10',
  variants: {
    variant: {
      primary: {},
      secondary: {},
      disable: {},
    },
  },
});

export default Button;

import MenuIcon from '@/icons/MenuIcon';
import {
  buttonBasicStyles,
  buttonWithSVGBasicStyles,
} from '@/styles/basicStyles';
import { css } from '@/styles/_stitches.config';

interface Props {
  onClick: () => void;
}

function HeaderMenuButton({ onClick }: Props) {
  return (
    <button className={button()} onClick={onClick}>
      <MenuIcon />
    </button>
  );
}

const button = css({
  ...buttonBasicStyles,
  ...buttonWithSVGBasicStyles,
  padding: '0.5rem',
});

export default HeaderMenuButton;

import MenuIcon from '@/icons/MenuIcon';
import { buttonBasicStyle, buttonWithSVGBasicStyle } from '@/styles/basicStyle';
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
  ...buttonBasicStyle,
  ...buttonWithSVGBasicStyle,
  padding: '0.5rem',
});

export default HeaderMenuButton;

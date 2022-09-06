import { css } from '@/styles/_stitches.config';
import { MenuIcon } from '@/icons/index';
import {
  buttonBasicStyles,
  buttonWithChildrenBasicStyles,
} from '@/styles/basicStyles';

interface Props {}

function HeaderMenu(props: Props) {
  return (
    <div className={block()}>
      <button className={button()}>
        <MenuIcon />
      </button>
    </div>
  );
}

const block = css({});

const button = css({
  ...buttonBasicStyles,
  ...buttonWithChildrenBasicStyles,
  padding: '0.5rem',
});

export default HeaderMenu;

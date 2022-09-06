import { css } from '@/styles/_stitches.config';
import useHeaderMenu from './hooks/useHeaderMenu';
import HeaderMenuNavigation from './HeaderMenuNavigation';
import HeaderMenuButton from './HeaderMenuButton';

interface Props {}

function HeaderMenu(props: Props) {
  const { visible, onClick } = useHeaderMenu();

  return (
    <div className={block()}>
      <HeaderMenuButton onClick={onClick} />
      <HeaderMenuNavigation visible={visible} />
    </div>
  );
}

const block = css({
  position: 'relative',
});

export default HeaderMenu;

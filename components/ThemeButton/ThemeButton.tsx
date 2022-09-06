import { css } from '@/styles/_stitches.config';
import {
  buttonBasicStyles,
  buttonWithChildrenBasicStyles,
} from '@/styles/basicStyles';
import { LightIcon, NightIcon } from '@/icons/index';

import useThemeButton from './hooks/useThemeButton';

interface Props {}

function ThemeButton(props: Props) {
  const { theme, onClick } = useThemeButton();

  return (
    <button className={block()} onClick={onClick}>
      {theme === 'light' ? <LightIcon /> : <NightIcon />}
    </button>
  );
}

const block = css({
  ...buttonBasicStyles,
  ...buttonWithChildrenBasicStyles,
  padding: '0.5rem',
});

export default ThemeButton;

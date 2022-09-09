import { css } from '@/styles/_stitches.config';
import {
  buttonBasicStyles,
  buttonWithSVGBasicStyles,
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
  ...buttonWithSVGBasicStyles,
  padding: '0.5rem',
});

export default ThemeButton;

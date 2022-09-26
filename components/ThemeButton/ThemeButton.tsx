import { css } from '@/styles/_stitches.config';
import { buttonBasicStyle, buttonWithSVGBasicStyle } from '@/styles/basicStyle';
import { LightIcon, NightIcon } from '@/icons/index';
import useThemeButton from './hooks/useThemeButton';

interface Props {}

function ThemeButton(props: Props) {
  const { theme, onClick } = useThemeButton();

  return (
    <button className={block()} onClick={onClick}>
      {theme === 'light' ? (
        <LightIcon aria-label="light-icon" />
      ) : (
        <NightIcon aria-label="night-icon" />
      )}
    </button>
  );
}

const block = css({
  ...buttonBasicStyle,
  ...buttonWithSVGBasicStyle,
  padding: '0.5rem',
});

export default ThemeButton;

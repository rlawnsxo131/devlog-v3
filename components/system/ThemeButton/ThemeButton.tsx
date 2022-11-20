import { LightIcon, NightIcon } from '@/components/img/icons';
import { css } from '@/styles/_stitches.config';
import { buttonBasicStyle, buttonWithSVGBasicStyle } from '@/styles/basicStyle';

import useThemeButton from './hooks/useThemeButton';

interface Props {}

function ThemeButton(props: Props) {
  const { theme, handleTheme } = useThemeButton();

  return (
    <button
      type="button"
      name="theme-button"
      className={block()}
      onClick={handleTheme}
    >
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

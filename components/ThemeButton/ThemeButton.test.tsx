import { render, fireEvent } from '@testing-library/react';
// import userEvent from '@testing-library/user-event'; @TODO: 버전 올라가면 다시 변경하기
import ThemeButton from '.';

function renderThemeButton() {
  const result = render(<ThemeButton />);

  const Button = () => result.getByRole('button');

  const LightIconSVG = () =>
    result.getByLabelText('light-icon', {
      selector: 'svg',
    });

  const NightIconSVG = () =>
    result.getByLabelText('night-icon', {
      selector: 'svg',
    });

  function clickThemeButton() {
    fireEvent.click(Button());
  }

  return {
    Button,
    LightIconSVG,
    NightIconSVG,
    clickThemeButton,
  };
}

describe('<ThemeButton />', () => {
  it('render', () => {
    const { Button } = renderThemeButton();
    expect(Button()).toBeInTheDocument();
  });

  it('click button', () => {
    const { LightIconSVG, NightIconSVG, clickThemeButton } =
      renderThemeButton();

    expect(LightIconSVG()).toBeInTheDocument();

    clickThemeButton();

    expect(NightIconSVG()).toBeInTheDocument();
  });
});

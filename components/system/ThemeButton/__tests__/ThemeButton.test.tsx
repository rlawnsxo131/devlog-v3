import { waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithGlobalHoc } from '@/__test_utils__/renderWithGlobalProviders';

import ThemeButton from '../ThemeButton';

function renderThemeButton() {
  const result = renderWithGlobalHoc(<ThemeButton />);

  const Button = () => result.getByRole('button');

  const LightIconSVG = () =>
    result.queryByLabelText('light-icon', {
      selector: 'svg',
    });

  const NightIconSVG = () =>
    result.queryByLabelText('night-icon', {
      selector: 'svg',
    });

  function clickThemeButton() {
    userEvent.click(Button());
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

  it('click button', async () => {
    const { LightIconSVG, NightIconSVG, clickThemeButton } =
      renderThemeButton();

    expect(LightIconSVG()).toBeInTheDocument();

    clickThemeButton();
    await waitForElementToBeRemoved(() => LightIconSVG());

    expect(NightIconSVG()).toBeInTheDocument();
  });
});

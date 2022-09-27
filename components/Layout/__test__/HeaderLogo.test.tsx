import { render } from '@testing-library/react';
import HeaderLogo from '../HeaderLogo';

function renderHeaderLogo() {
  const result = render(<HeaderLogo />);

  const LogoText = () =>
    result.getByText('DevLog', {
      selector: 'h1',
    });

  return {
    LogoText,
  };
}

describe('<HeaderLogo />', () => {
  it('render', () => {
    const { LogoText } = renderHeaderLogo();

    expect(LogoText()).toBeInTheDocument();
  });
});

import { renderWithGlobalHoc } from '@/__test_utils__/renderWithGlobalProviders';
import HeaderLogo from '../HeaderLogo';

function renderHeaderLogo() {
  const result = renderWithGlobalHoc(<HeaderLogo />);

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

  it('anchor path is /', () => {
    const { LogoText } = renderHeaderLogo();

    expect(LogoText().closest('a')).toHaveAttribute('href', '/');
  });
});

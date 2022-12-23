import { renderWithGlobalHoc } from '@/__test_utils__/renderWithGlobalProviders';

import HeaderWebMenu from '../HeaderWebMenu';

jest.mock('next/router', () => ({
  useRouter() {
    return {
      pathname: '/',
    };
  },
}));

function renderHeaderWebMenu() {
  const result = renderWithGlobalHoc(<HeaderWebMenu />);

  const PostAnchor = () =>
    result.queryByText('포스트', {
      selector: 'a',
    });

  const InfoAnchor = () =>
    result.queryByText('소개', {
      selector: 'a',
    });

  return {
    PostAnchor,
    InfoAnchor,
  };
}

describe('<HeaderWebMenu />', () => {
  it('render', () => {
    const { PostAnchor, InfoAnchor } = renderHeaderWebMenu();

    expect(PostAnchor()).toBeInTheDocument();
    expect(InfoAnchor()).toBeInTheDocument();
  });

  it('click the links inside the menu navigation', async () => {
    const { PostAnchor, InfoAnchor } = renderHeaderWebMenu();

    expect(PostAnchor()).toHaveAttribute('href', '/');
    expect(InfoAnchor()).toHaveAttribute('href', '/info');
  });
});

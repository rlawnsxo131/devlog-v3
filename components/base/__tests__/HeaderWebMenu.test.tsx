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
    result.getByText('포스트', {
      selector: 'a',
    });

  const TagAnchor = () =>
    result.getByText('태그', {
      selector: 'a',
    });

  const InfoAnchor = () =>
    result.getByText('소개', {
      selector: 'a',
    });

  return {
    PostAnchor,
    TagAnchor,
    InfoAnchor,
  };
}

describe('<HeaderWebMenu />', () => {
  it('render', () => {
    const { PostAnchor, TagAnchor, InfoAnchor } = renderHeaderWebMenu();

    expect(PostAnchor()).toBeInTheDocument();
    expect(TagAnchor()).toBeInTheDocument();
    expect(InfoAnchor()).toBeInTheDocument();
  });

  it('click the links inside the menu navigation', async () => {
    const { PostAnchor, TagAnchor, InfoAnchor } = renderHeaderWebMenu();

    expect(PostAnchor()).toHaveAttribute('href', '/');
    expect(InfoAnchor()).toHaveAttribute('href', '/info');
  });
});

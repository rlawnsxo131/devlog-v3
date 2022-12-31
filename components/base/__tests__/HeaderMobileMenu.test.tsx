import {
  act,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithGlobalHoc } from '@/__test_utils__/renderWithGlobalProviders';

import HeaderMobileMenu from '../HeaderMobileMenu';

jest.mock('next/router', () => ({
  useRouter() {
    return {
      pathname: '/',
    };
  },
}));

function renderHeaderMobileMenu() {
  const result = renderWithGlobalHoc(<HeaderMobileMenu />);

  const HeaderMenuButton = () => result.getByRole('button');

  const HeaderMenuNavigation = () => result.queryByRole('navigation');

  const PostAnchor = () =>
    result.queryByText('포스트', {
      selector: 'a',
    });

  const TagsAnchor = () =>
    result.queryByText('태그', {
      selector: 'a',
    });

  const InfoAnchor = () =>
    result.queryByText('소개', {
      selector: 'a',
    });

  function clickMenuButton() {
    userEvent.click(HeaderMenuButton());
  }

  return {
    result,
    HeaderMenuButton,
    HeaderMenuNavigation,
    PostAnchor,
    TagsAnchor,
    InfoAnchor,
    clickMenuButton,
  };
}

describe('<HeaderMobileMenu />', () => {
  const duration = 250;

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  it('render', () => {
    const { HeaderMenuButton } = renderHeaderMobileMenu();

    expect(HeaderMenuButton()).toBeInTheDocument();
  });

  it('toggle menu button', async () => {
    const { HeaderMenuNavigation, clickMenuButton } = renderHeaderMobileMenu();

    clickMenuButton();
    act(() => {
      jest.advanceTimersByTime(duration);
    });
    await waitFor(() => {
      expect(HeaderMenuNavigation()).toBeInTheDocument();
    });

    clickMenuButton();
    act(() => {
      jest.advanceTimersByTime(duration);
    });
    await waitForElementToBeRemoved(() => HeaderMenuNavigation());
    expect(HeaderMenuNavigation()).toBeNull();
  });

  it('click the links inside the menu navigation', async () => {
    const {
      HeaderMenuNavigation,
      PostAnchor,
      TagsAnchor,
      InfoAnchor,
      clickMenuButton,
    } = renderHeaderMobileMenu();

    clickMenuButton();
    act(() => {
      jest.advanceTimersByTime(duration);
    });
    await waitFor(() => {
      expect(HeaderMenuNavigation()).toBeInTheDocument();
    });

    expect(PostAnchor()).toHaveAttribute('href', '/');
    expect(TagsAnchor()).toHaveAttribute('href', '/tags');
    expect(InfoAnchor()).toHaveAttribute('href', '/info');
  });
});

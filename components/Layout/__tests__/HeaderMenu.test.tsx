import {
  act,
  render,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import HeaderMenu from '../HeaderMenu';

jest.mock('next/router', () => ({
  useRouter() {
    return {
      pathname: '/',
    };
  },
}));

function renderHeaderMenu() {
  const result = render(<HeaderMenu />);

  const HeaderMenuButton = () => result.getByRole('button');

  const HeaderMenuNavigation = () => result.queryByRole('navigation');

  const PostAnchor = () =>
    result.getByText('포스트', {
      selector: 'a',
    });

  const InfoAnchor = () =>
    result.getByText('소개', {
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
    InfoAnchor,
    clickMenuButton,
  };
}

describe('<HeaderMenu />', () => {
  const duration = 250;

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  it('render', () => {
    const { HeaderMenuButton } = renderHeaderMenu();

    expect(HeaderMenuButton()).toBeInTheDocument();
  });

  it('toggle menu button', async () => {
    const { HeaderMenuNavigation, clickMenuButton } = renderHeaderMenu();

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
    const { HeaderMenuNavigation, PostAnchor, InfoAnchor, clickMenuButton } =
      renderHeaderMenu();

    clickMenuButton();
    act(() => {
      jest.advanceTimersByTime(duration);
    });
    await waitFor(() => {
      expect(HeaderMenuNavigation()).toBeInTheDocument();
    });

    expect(PostAnchor()).toHaveAttribute('href', '/');
    expect(InfoAnchor()).toHaveAttribute('href', '/info');
  });
});

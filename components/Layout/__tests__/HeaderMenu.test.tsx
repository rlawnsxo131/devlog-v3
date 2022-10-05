import {
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

  function clickMenuButton() {
    userEvent.click(HeaderMenuButton());
  }

  return {
    result,
    HeaderMenuButton,
    HeaderMenuNavigation,
    clickMenuButton,
  };
}

describe('<HeaderMenu />', () => {
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
    await waitFor(() => {
      expect(HeaderMenuNavigation()).toBeInTheDocument();
    });

    clickMenuButton();
    await waitForElementToBeRemoved(() => HeaderMenuNavigation());
    expect(HeaderMenuNavigation()).toBeNull();
  });

  it('click the links inside the menu navigation', () => {});
});

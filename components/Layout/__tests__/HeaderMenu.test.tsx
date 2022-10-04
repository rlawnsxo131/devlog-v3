import { act, fireEvent, render } from '@testing-library/react';
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

  const HeaderMenuNavigation = () => result.getByRole('navigation');

  const HeaderMenuNavigationOfHidden = () =>
    result.getByRole('navigation', { hidden: true });

  function clickMenuButton() {
    fireEvent.click(HeaderMenuButton());
  }

  return {
    HeaderMenuButton,
    HeaderMenuNavigation,
    HeaderMenuNavigationOfHidden,
    clickMenuButton,
  };
}

describe('<HeaderMenu />', () => {
  const duration = 250;

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  it('render', () => {
    const { HeaderMenuButton } = renderHeaderMenu();

    expect(HeaderMenuButton()).toBeInTheDocument();
  });

  it('toggle <HeaderMenuButton />', async () => {
    const {
      HeaderMenuNavigation,
      HeaderMenuNavigationOfHidden,
      clickMenuButton,
    } = renderHeaderMenu();

    clickMenuButton();
    act(() => {
      jest.advanceTimersByTime(duration);
      expect(HeaderMenuNavigation()).toBeInTheDocument();
    });

    clickMenuButton();
    act(() => {
      jest.advanceTimersByTime(duration);
      expect(HeaderMenuNavigationOfHidden()).toBeInTheDocument();
    });
  });

  it('click the links inside the <HeaderMenuNavigation />', () => {});
});

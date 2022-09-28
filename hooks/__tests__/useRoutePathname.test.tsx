import useRoutePathname from '../useRoutePathname';

const pathname = '/test';
jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname,
      query: '',
      asPath: '',
    };
  },
}));

describe('useRoutePathname', () => {
  it('routePathname to be /test', () => {
    expect(useRoutePathname()).toBe(pathname);
  });
});

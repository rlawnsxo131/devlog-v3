import { useRouter } from 'next/router';

import useRoutePathname from '@/hooks/useRoutePathname';

// const pathname = '/test';
// jest.mock('next/router', () => ({
//   useRouter() {
//     return {
//       route: '/',
//       pathname,
//       query: '',
//       asPath: '',
//     };
//   },
// }));

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('useRoutePathname', () => {
  it('routePathname to be /test', () => {
    const pathname = '/test';
    (useRouter as jest.Mock).mockImplementationOnce(() => ({ pathname }));

    expect(useRoutePathname()).toBe(pathname);
  });
});

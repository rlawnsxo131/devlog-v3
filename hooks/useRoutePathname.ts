import { useRouter } from 'next/router';

export default function useRoutePathname() {
  const router = useRouter();
  const routePathname = router.pathname;

  return routePathname;
}

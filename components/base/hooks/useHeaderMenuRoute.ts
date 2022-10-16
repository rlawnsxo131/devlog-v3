import useRoutePathname from '@/hooks/useRoutePathname';

export default function useHeaderMenuRoute() {
  const routePathname = useRoutePathname();

  const getRouteVariant = (path: string) => {
    return routePathname === path ? 'active' : 'default';
  };

  return {
    routePathname,
    getRouteVariant,
  };
}

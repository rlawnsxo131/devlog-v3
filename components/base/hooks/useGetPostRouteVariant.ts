import { useMemo } from 'react';

export default function useGetPostRouteVariant(routePathname: string) {
  return useMemo(() => {
    const isAllPostPath = routePathname === '/';
    const isTagPostPath = routePathname === '/posts/[tag]';
    return isAllPostPath || isTagPostPath ? 'active' : 'default';
  }, [routePathname]);
}

import { useRouter } from 'next/router';

export default function useRoutePathname() {
  return useRouter().pathname;
}

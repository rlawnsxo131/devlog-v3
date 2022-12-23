import { useRouter } from 'next/router';

export default function useRouteQuery() {
  return useRouter().query;
}

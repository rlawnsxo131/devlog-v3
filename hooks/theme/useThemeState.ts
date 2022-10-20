import { useGlobalContextState } from 'contexts/GlobalContext';

export default function useThemeState() {
  return useGlobalContextState().theme;
}

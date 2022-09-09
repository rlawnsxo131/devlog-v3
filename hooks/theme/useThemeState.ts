import useThemeStore from './_useThemeStore';

export default function useThemeState() {
  return useThemeStore((store) => store.theme);
}

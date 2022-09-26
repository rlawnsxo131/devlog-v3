import { renderHook, act } from '@testing-library/react';
import useThemeButton from '../ThemeButton/hooks/useThemeButton';

describe('useThemeButton', () => {
  it('onClick', () => {
    const { result } = renderHook(() => useThemeButton());

    expect(result.current.theme).toBe('light');

    act(() => result.current.onClick());

    expect(result.current.theme).toBe('dark');
  });
});

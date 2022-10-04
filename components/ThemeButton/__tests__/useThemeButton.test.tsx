import { renderHook, act } from '@testing-library/react';
import useThemeButton from '../hooks/useThemeButton';

describe('useThemeButton', () => {
  it('onClick', () => {
    const { result } = renderHook(() => useThemeButton());

    expect(result.current.theme).toBe('light');

    act(() => result.current.handleTheme());

    expect(result.current.theme).toBe('dark');
  });
});

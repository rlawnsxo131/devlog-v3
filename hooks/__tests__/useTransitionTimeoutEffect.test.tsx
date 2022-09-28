import { renderHook } from '@testing-library/react';
import useTransitionTimeoutEffect from '../useTransitionTimeoutEffect';

describe('useTransitionTimeoutEffect', () => {
  const duration = 250;

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  it('closed is false', async () => {
    const { result } = renderHook(() =>
      useTransitionTimeoutEffect({ visible: true, duration }),
    );

    jest.advanceTimersByTime(duration);

    expect(result.current).toBe(false);
  });

  it('closed is true', async () => {
    const { result } = renderHook(() =>
      useTransitionTimeoutEffect({ visible: false, duration }),
    );

    jest.advanceTimersByTime(duration);

    expect(result.current).toBe(true);
  });
});

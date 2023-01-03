import { useCallback, useEffect, useRef } from 'react';

type Callback = (...args: any[]) => any;

export default function usePreservedCallback(callback: Callback): Callback {
  const callbackRef = useRef<Callback>(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  return useCallback(
    (...args: any[]) => {
      return callbackRef.current(...args);
    },
    [callbackRef],
  );
}

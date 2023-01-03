import type { DependencyList } from 'react';
import { useCallback, useRef } from 'react';

import usePreservedCallback from './usePreservedCallback';

type EffectRef<E extends HTMLElement = HTMLElement> = (
  element: E | null,
) => void;

type CleanupCallback = () => void;
type RefCallback<E extends HTMLElement = HTMLElement> = (
  element: E,
) => CleanupCallback | void;

export default function useRefEffect<E extends HTMLElement = HTMLElement>(
  callback: RefCallback<E>,
  deps: DependencyList,
): EffectRef<E> {
  const preservedCallback = usePreservedCallback(callback);
  const disposeRef = useRef<CleanupCallback>(noop);

  const effect = useCallback(
    (element: E | null) => {
      disposeRef.current();
      disposeRef.current = noop;

      if (element) {
        const cleanup = callback(element);

        if (typeof cleanup === 'function') {
          disposeRef.current = cleanup;
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [preservedCallback, ...deps],
  );

  return effect;
}

function noop() {
  // noop
}

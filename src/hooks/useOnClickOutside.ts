import { RefObject, useEffect } from 'react';

const useOnClickOutside = <T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: (e: MouseEvent) => void,
  mouseEvent: 'mousedown' | 'mouseup' = 'mousedown',
) => {
  useEffect(() => {
    const listener = (e: MouseEvent) => {
      const el = ref.current;
      if (!el || el.contains(e.target as Node)) return;
      handler(e);
    };
    document.addEventListener(mouseEvent, listener);
    return () => document.removeEventListener(mouseEvent, listener);
  }, [ref, handler]);
};

export default useOnClickOutside;

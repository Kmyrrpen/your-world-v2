import React, { useEffect } from 'react';

const useClickOutside = <T>(
  ref: React.MutableRefObject<T>,
  handler: (event?: MouseEvent) => void,
) => {
  useEffect(() => {
    const listener = (e: MouseEvent) => {
      if (ref.current && ref.current !== e.target) {
        handler(e);
      }
    };

    document.addEventListener('click', listener);
    return () => removeEventListener('click', listener);
  });
};

export default useClickOutside;

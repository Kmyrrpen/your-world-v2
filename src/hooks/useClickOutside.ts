import React, { useEffect } from 'react';

const useClickOutside = <T>(
  ref: React.MutableRefObject<T>,
  handler: (event?: MouseEvent) => void,
) => {
  useEffect(() => {
    document.addEventListener('click', (e) => {
      if (ref.current && ref.current !== e.target) {
        handler(e);
      }
    });
  });
};

export default useClickOutside;

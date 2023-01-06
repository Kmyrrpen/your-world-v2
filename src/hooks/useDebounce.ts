import { useState, useEffect } from "react";

const useDebounce = (callback: () => void, delay: number) => {
  const [debouncing, setDebouncing] = useState(false);

  useEffect(() => {
    if (debouncing) {
      const timeout = setTimeout(() => {
        callback();
        setDebouncing(false);
      }, delay);

      return () => clearTimeout(timeout);
    }
  }, [debouncing, callback, delay]);

  return () => setDebouncing(true);
}

export default useDebounce
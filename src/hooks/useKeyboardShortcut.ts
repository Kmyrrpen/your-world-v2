import { useEffect } from "react";

const useKeyboardShortcut = (
  callback: () => void,
  options: { key: string; mod?: boolean },
) => {
  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      const mod = options.mod ? e.ctrlKey || e.metaKey : true;
      if (mod && e.key === options.key) {
        e.preventDefault();
        callback();
      }
    };
    window.addEventListener("keydown", listener);
    return () => window.removeEventListener("keydown", listener);
  }, [callback, options]);
};

export default useKeyboardShortcut;

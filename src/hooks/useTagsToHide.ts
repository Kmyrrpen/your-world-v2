import { useLayoutEffect, useRef, useState } from "react";

const useTagsToHide = () => {
  const containerRef = useRef<HTMLUListElement | null>(null);
  const [toHide, setToHide] = useState(0);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // needed for calculation
    const size = container.offsetWidth;
    const scrollSize = container.scrollWidth;

    // get how many tags we should hide
    if (scrollSize > size) {
      let childrenToHide = 0;
      let accumulatingSize = 0;

      // remove items until we can fit all tags
      for (let i = container.children.length - 1; i >= 0; i--) {
        childrenToHide++;
        accumulatingSize += container.children[i].clientWidth;
        if (scrollSize - accumulatingSize <= size) break;
      }

      setToHide(childrenToHide);
    }
  }, [containerRef, setToHide]);

  return { containerRef, toHide };
};

export default useTagsToHide;
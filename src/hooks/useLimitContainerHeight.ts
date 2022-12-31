import { useLayoutEffect, useRef } from "react";

/**
 * changes container height of ref attached to the it's first
 * child's size multiplied to `count` passed.
 *
 */
const useLimitContainerHeight = (count: number) => {
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const container = ref.current;
    if (!container || !container.firstChild) return;
    if (Object.hasOwn(container.firstChild, "offsetHeight"))
      throw new Error("children of container must be an HTML Element");
  }, []);

  return ref;
};

export default useLimitContainerHeight;

import { useLayoutEffect } from "react";
import { getScrollbarWidth } from "@/utils";

// this hook is a modified version from this blog:
// https://maxschmitt.me/posts/react-prevent-layout-shift-body-scrollable/

const scrollbarWidth = getScrollbarWidth();

const usePreventScrollShifting = () => {
  useLayoutEffect(() => {
    const setPaddingRight = (isScrollable: boolean) => {
      if (isScrollable) document.body.style.paddingRight = "0px";
      else document.body.style.paddingRight = `${scrollbarWidth}px`;
    };
    
    const resizeObserver = new ResizeObserver(() => {
      setPaddingRight(document.body.scrollHeight > window.innerHeight);
    });
    resizeObserver.observe(document.body);
    
    return () => {
      resizeObserver.unobserve(document.body);
    };
  }, []);
};

export default usePreventScrollShifting;

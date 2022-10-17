import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

/**
 * change route outside of react, it dispatches a custom event on the document
 * and we listen to that event inside the react context with useEnableChangeRoute().
 */
export const changeRoute = (path: string) => {
  const event = new CustomEvent("changeRoute", { detail: path });
  document.dispatchEvent(event);
};

/**
 * listen for changeRoute() calls outside of react with a custom event listener.
 */
const useEnableChangeRoute = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const listener = (e: CustomEventInit<string>) => {
      const { detail } = e;
      if (detail) navigate(detail);
    };
    document.addEventListener("changeRoute", listener);

    return () => {
      document.removeEventListener("changeRoute", listener);
    };
  }, []);
};

export default useEnableChangeRoute;

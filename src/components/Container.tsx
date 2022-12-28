import { polyRef } from "@/utils";
import { PolyProps } from "@/utils/types";
import { twMerge } from "tailwind-merge";

const Container = polyRef<"li", PolyProps>(
  ({ as: As = "div", className, ...props }, ref) => {
    return <As className={twMerge("", className)} ref={ref} {...props} />;
  },
);

export default Container;

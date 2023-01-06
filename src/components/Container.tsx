import { polyRef } from "@/utils";
import { PolyProps } from "@/utils/types";
import { twMerge } from "tailwind-merge";

const Container = polyRef<"li", PolyProps>(
  ({ as: As = "div", className, ...props }, ref) => {
    return (
      <As
        className={twMerge("mx-auto max-w-screen-lg px-4", className)}
        ref={ref}
        {...props}
      />
    );
  },
);

export default Container;

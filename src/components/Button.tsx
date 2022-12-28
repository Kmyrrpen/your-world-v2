import { polyRef } from "@/utils";
import { PolyProps } from "@/utils/types";
import { twMerge } from "tailwind-merge";

const Button = polyRef<"button", PolyProps>(
  ({ as: As = "button", className, ...props }, ref) => {
    return <As className={twMerge("", className)} ref={ref} {...props} />;
  },
);

export default Button;

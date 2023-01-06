import { polyRef } from "@/utils";
import { PolyProps } from "@/utils/types";
import { twMerge } from "tailwind-merge";

const Button = polyRef<"button", PolyProps>(
  ({ as: As = "button", className, ...props }, ref) => {
    return (
      <As
        className={twMerge(
          "border bg-black py-1.5 px-3 font-sans text-sm font-medium leading-tight text-white transition-colors hover:bg-primary-300 hover:text-black rounded",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);

export default Button;

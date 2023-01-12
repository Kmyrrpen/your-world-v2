import { polyRef } from "@/utils";
import { PolyProps } from "@/utils/types";
import { twMerge } from "tailwind-merge";

type Props = PolyProps<{
  style?: keyof typeof styleTw;
}>;

const styleTw = {
  default: "bg-black hover:bg-primary-300 hover:text-black text-white",
  disabled: "bg-gray-400 opacity-80 text-white cursor-not-allowed",
};

const Button = polyRef<"button", Props>(
  ({ as: As = "button", style = "default", className, ...props }, ref) => {
    return (
      <As
        className={twMerge(
          "rounded border py-1.5 px-3 font-sans text-sm font-medium leading-tight transition-colors",
          styleTw[style],
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);

export default Button;

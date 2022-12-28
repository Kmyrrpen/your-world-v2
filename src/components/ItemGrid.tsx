import { polyRef } from "@/utils";
import { PolyProps } from "@/utils/types";
import { twMerge } from "tailwind-merge";

const ItemGrid = polyRef<"ul", PolyProps>(
  ({ as: As = "ul", className, ...props }, ref) => (
    <As className={twMerge("", className)} ref={ref} {...props} />
  ),
);

export default ItemGrid;

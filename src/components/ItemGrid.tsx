import { polyRef } from "@/utils";
import { PolyProps } from "@/utils/types";
import { twMerge } from "tailwind-merge";

const ItemGrid = polyRef<"ul", PolyProps>(
  ({ as: As = "ul", className, ...props }, ref) => (
    <As className={twMerge("grid grid-cols-1 gap-2 md:grid-cols-2", className)} ref={ref} {...props} />
  ),
);

export default ItemGrid;

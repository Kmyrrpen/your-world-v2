import { ComponentPropsWithoutRef, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

const FormFieldLabel = forwardRef<
  HTMLLabelElement,
  ComponentPropsWithoutRef<"label">
>(({ className, ...props }, ref) => (
  <label
    ref={ref}
    className={twMerge("text-xs mb-1 text-gray-600 font-sans font-medium", className)}
    {...props}
  />
));

export default FormFieldLabel;

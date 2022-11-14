import { ComponentPropsWithoutRef, forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

/**
 * Since react-hook-form needs to access ref on its own, we'll have to use forwardRef on this component
 * if we don't want to keep setting `innerRef` to `ref` everytime we use a formfield.
 */
const FormFieldInput = forwardRef<
  HTMLInputElement,
  ComponentPropsWithoutRef<'input'>
>(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={twMerge(
      'border-b border-b-neutral-300 pb-1 outline-none',
      className,
    )}
    {...props}
  />
));

export default FormFieldInput;

import { ComponentPropsWithoutRef, forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

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

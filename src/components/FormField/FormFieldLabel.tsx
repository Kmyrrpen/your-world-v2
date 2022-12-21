import { ComponentPropsWithoutRef, forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

const FormFieldLabel = forwardRef<
  HTMLLabelElement,
  ComponentPropsWithoutRef<'label'>
>(({ className, ...props }, ref) => (
  <label
    ref={ref}
    className={twMerge('text-sm text-neutral-600', className)}
    {...props}
  />
));

export default FormFieldLabel;

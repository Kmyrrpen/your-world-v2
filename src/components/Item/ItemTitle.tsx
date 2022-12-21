import { ComponentPropsWithoutRef, forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

const ItemTitle = forwardRef<
  HTMLHeadingElement,
  ComponentPropsWithoutRef<'h2'>
>(({ className, ...props }, ref) => (
  <h2
    ref={ref}
    className={twMerge('text-lg font-bold', className)}
    {...props}
  />
));

export default ItemTitle;

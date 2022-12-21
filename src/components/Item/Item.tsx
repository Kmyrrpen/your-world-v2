import { ComponentPropsWithoutRef, forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

const Item = forwardRef<
  HTMLLIElement,
  ComponentPropsWithoutRef<'li'>
>(({ className, ...props }, ref) => (
  <li
    ref={ref}
    className={twMerge(
      'flex flex-col gap-1 border border-neutral-400 p-2 sm:p-3',
      className,
    )}
    {...props}
  />
));

export default Item;

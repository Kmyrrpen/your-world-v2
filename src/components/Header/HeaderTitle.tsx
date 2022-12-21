import { ComponentPropsWithoutRef, forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

const HeaderTitle = forwardRef<
  HTMLHeadingElement,
  ComponentPropsWithoutRef<'h1'>
>(({ className, ...props }, ref) => (
  <h1
    ref={ref}
    className={twMerge(
      'text-xl font-bold leading-none sm:text-2xl md:text-3xl md:leading-none',
      className,
    )}
    {...props}
  />
));

export default HeaderTitle;

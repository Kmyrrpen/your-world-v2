import { ComponentPropsWithoutRef, forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

const Header = forwardRef<HTMLDivElement, ComponentPropsWithoutRef<'div'>>(
  ({ className, ...props }, ref) => (
    <div
      className={twMerge('mb-5 flex flex-col items-start gap-4', className)}
      ref={ref}
      {...props}
    />
  ),
);

export default Header;

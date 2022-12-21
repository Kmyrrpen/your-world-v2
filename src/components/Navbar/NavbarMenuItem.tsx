import { ComponentPropsWithoutRef, forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

const NavbarMenuItem = forwardRef<
  HTMLLIElement,
  ComponentPropsWithoutRef<'li'>
>(({ className, ...props }, ref) => (
  <li
    className={twMerge('p-1.5 px-2 sm:px-4', className)}
    ref={ref}
    {...props}
  />
));

export default NavbarMenuItem;

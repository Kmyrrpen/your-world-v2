import { ComponentPropsWithoutRef, forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

/** The layer of black that covers the screen when modal is up, attach your
 * `closeModal` function on click
 */
const ModalBackground = forwardRef<
  HTMLDivElement,
  Omit<ComponentPropsWithoutRef<'div'>, 'children'>
>(({ className, ...props }, ref) => (
  <div
    className={twMerge(
      'absolute top-0 left-0 z-10 h-full w-full bg-gray-800 opacity-40',
      className,
    )}
    ref={ref}
    {...props}
  />
));

export default ModalBackground;

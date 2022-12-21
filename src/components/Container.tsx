import { ComponentPropsWithoutRef, forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

const Container = forwardRef<HTMLDivElement, ComponentPropsWithoutRef<'div'>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        className={twMerge(
          'w-full max-w-container-xs px-4 pb-4 sm:max-w-container-sm sm:px-6 md:max-w-container-md md:px-8 lg:max-w-container-lg lg:px-10 xl:max-w-container-xl',
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);

export default Container;

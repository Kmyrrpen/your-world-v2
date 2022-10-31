import { PolymorhpicWithRef, PolymorphicRef } from '@/utils';
import React, { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

const Icon = forwardRef(
  <C extends React.ElementType = 'button'>(
    { as, children, className, ...props }: PolymorhpicWithRef<C>,
    ref: PolymorphicRef<C>,
  ) => {
    const Component = as || 'button';
    return (
      <Component
        ref={ref}
        className={twMerge(
          'inline-flex w-10 items-center rounded-lg p-2 text-sm text-black hover:bg-zinc-200 focus:outline-none focus:ring-2 focus:ring-zinc-200 dark:text-white dark:hover:bg-dark-300 dark:focus:ring-zinc-600 ',
          className,
        )}
        {...props}
      >
        {children}
      </Component>
    );
  },
);

Icon.displayName = 'Icon';

export default Icon;

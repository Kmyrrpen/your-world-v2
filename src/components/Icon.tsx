import React, { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';
import {
  PolymorphicFunctionComponentWithRef,
  PolymorphicPropsWithoutRef,
  PolymorphicRef,
} from '@/utils/types';

type Props = {
  isActive?: boolean;
};

const Icon: PolymorphicFunctionComponentWithRef<'button', Props> = forwardRef(
  <T extends React.ElementType = 'button'>(
    {
      as,
      children,
      className,
      isActive,
      ...props
    }: PolymorphicPropsWithoutRef<T, Props>,
    ref: PolymorphicRef,
  ) => {
    const Component = as || 'button';

    return (
      <Component
        ref={ref}
        className={twMerge(
          'inline-flex w-10 items-center rounded-lg p-2 text-sm text-black hover:bg-zinc-200 focus:outline-none focus:ring-2 focus:ring-zinc-200 dark:text-white dark:hover:bg-dark-300 dark:focus:ring-zinc-600',
          isActive && 'ring-2 ring-zinc-200 dark:ring-zinc-600',
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

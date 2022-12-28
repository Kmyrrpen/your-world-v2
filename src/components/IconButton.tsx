import { polyRef } from '@/utils';
import { ElementType } from 'react';
import { twMerge } from 'tailwind-merge';

type Props = {
  className?: string;
};

const IconButton = polyRef<'button', Props>(
  ({ as, className, ...props }, ref) => {
    const Element: ElementType = as || 'button';
    return (
      <Element
        ref={ref}
        className={twMerge(
          'inline-flex items-center justify-center gap-2 text-sm text-black hover:text-gray-500 dark:text-white',
          className,
        )}
        {...props}
      />
    );
  },
);

export default IconButton;
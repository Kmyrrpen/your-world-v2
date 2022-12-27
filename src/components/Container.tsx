import { polyRef } from '@/utils';
import { twMerge } from 'tailwind-merge';

type Props = {
  className?: string;
};

const Container = polyRef<'div', Props>(
  ({ as: As = 'div', className, ...props }, ref) => {
    return (
      <As
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

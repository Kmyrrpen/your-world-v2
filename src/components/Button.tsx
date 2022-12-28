import { polyRef } from '@/utils';
import { ElementType } from 'react';
import { twMerge } from 'tailwind-merge';

type Props = {
  className?: string;
};

const Button = polyRef<'button', Props>(({ as, className, ...props }, ref) => {
  const Elem: ElementType = as || 'button';
  return (
    <Elem
      className={twMerge(
        'flex items-center gap-3 rounded-sm py-1.5 px-3 bg-primary-300 font-bold hover:text-gray-500',
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});

export default Button;

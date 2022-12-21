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
        'flex items-center gap-3 border-b border-dashed p-0.5 px-1 font-bold hover:text-neutral-500',
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});

export default Button;

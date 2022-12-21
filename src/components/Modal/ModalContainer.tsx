import { ComponentPropsWithoutRef, forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

type Props = {
  size?: 'small' | 'medium' | 'large' | 'responsive';
} & ComponentPropsWithoutRef<'div'>;

const ModalContainer = forwardRef<HTMLDivElement, Props>(
  ({ size = 'responsive', className, ...props }, ref) => {
    let sizeTw: string;
    switch (size) {
      case 'small':
        sizeTw = 'max-w-xs';
        break;
      case 'medium':
        sizeTw = 'max-w-md';
        break;
      case 'large':
        sizeTw = 'max-w-2xl';
        break;
      case 'responsive':
        sizeTw = 'max-w-md lg:max-w-xl';
    }
    return (
      <div
        className={twMerge(
          'dark:bg-dark-100 relative z-20 flex min-h-[10rem] w-full flex-col justify-start rounded bg-white p-4',
          sizeTw,
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);

export default ModalContainer;

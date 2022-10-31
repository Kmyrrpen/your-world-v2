import { twMerge } from 'tailwind-merge';
import { ComponentPropsWithoutRef } from 'react';

/** The layer of black that covers the screen when modal is up, attach your `closeModal` function on click */
const ModalBackground: React.FC<ComponentPropsWithoutRef<'div'>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div
      className={twMerge(
        'absolute top-0 left-0 z-10 h-full w-full bg-zinc-900 opacity-40',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default ModalBackground;
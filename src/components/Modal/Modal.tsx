import { twMerge } from 'tailwind-merge';
import { ComponentPropsWithoutRef } from 'react';

const Modal: React.FC<ComponentPropsWithoutRef<'div'>> = ({
  className,
  children,
  ...props
}) => {
  return (
    <div
      className={twMerge(
        'fixed top-0 left-0 z-50 h-full w-full overflow-y-auto overflow-x-hidden',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default Modal;
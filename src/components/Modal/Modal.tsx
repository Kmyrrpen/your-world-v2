import { ComponentPropsWithoutRef, forwardRef } from 'react';
import { createPortal } from 'react-dom';
import { twMerge } from 'tailwind-merge';

const modalRoot = document.getElementById('modal-portal') as HTMLElement;
const Modal = forwardRef<HTMLDivElement, ComponentPropsWithoutRef<'div'>>(
  ({ className, children, ...props }, ref) =>
    createPortal(
      <div
        className={twMerge(
          'fixed top-0 left-0 z-50 h-full w-full overflow-y-auto overflow-x-hidden',
          className,
        )}
        ref={ref}
        {...props}
      >
        {/* This extra div is needed to stop content from being cut on scroll when content
     height is longer than the viewport */}
        <div className="absolute top-0 left-0 z-10 flex h-auto min-h-full w-full items-center justify-center p-4">
          {children}
        </div>
      </div>,
      modalRoot,
    ),
);

export default Modal;

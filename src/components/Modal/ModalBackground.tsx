import { twMerge } from 'tailwind-merge';
import { WithComponentProps } from '@/utils/types';

/** The layer of black that covers the screen when modal is up, attach your `closeModal` function on click */
const ModalBackground: React.FC<
  Omit<WithComponentProps<'div'>, 'children'>
> = ({ innerRef, className, ...props }) => {
  return (
    <div
    ref={innerRef}
      className={twMerge(
        'absolute top-0 left-0 z-10 h-full w-full bg-zinc-900 opacity-40',
        className,
      )}
      {...props}
    />
  );
};

export default ModalBackground;

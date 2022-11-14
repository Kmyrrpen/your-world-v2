import { WithComponentProps } from '@/utils/types';
import { twMerge } from 'tailwind-merge';

/** The layer of black that covers the screen when modal is up, attach your
 * `closeModal` function on click
 */
const ModalBackground: React.FC<
  Omit<WithComponentProps<'div'>, 'children'>
> = ({ innerRef, className, ...props }) => (
  <div
    className={twMerge(
      'absolute top-0 left-0 z-10 h-full w-full bg-neutral-800 opacity-40',
      className,
    )}
    ref={innerRef}
    {...props}
  />
);

export default ModalBackground;

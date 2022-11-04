import { WithComponentProps } from '@/utils/types';
import { twMerge } from 'tailwind-merge';

/** To fix modal popup getting it's content cut a little from the top and bottom, we can do this little trick */
const ModalScrollFix: React.FC<WithComponentProps<'div'>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div
      className={twMerge(
        'absolute top-0 left-0 z-10 flex h-auto min-h-full w-full items-center justify-center p-3',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default ModalScrollFix;

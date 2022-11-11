import { WithComponentProps } from '@/utils/types';
import { twMerge } from 'tailwind-merge';

const Container: React.FC<WithComponentProps<'div'>> = ({
  className,
  innerRef,
  ...props
}) => {
  return (
    <div
      className={twMerge(
        'w-full pb-4 max-w-container-xs px-4 sm:max-w-container-sm sm:px-6 md:max-w-container-md md:px-8 lg:max-w-container-lg lg:px-10 xl:max-w-container-xl',
        className,
      )}
      ref={innerRef}
      {...props}
    />
  );
};

export default Container;

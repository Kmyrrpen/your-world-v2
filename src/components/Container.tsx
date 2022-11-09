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
        'w-full max-w-lg px-4 sm:max-w-3xl md:max-w-4xl lg:max-w-6xl ',
        className,
      )}
      ref={innerRef}
      {...props}
    />
  );
};

export default Container;

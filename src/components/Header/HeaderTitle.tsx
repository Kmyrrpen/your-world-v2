import { WithComponentProps } from '@/utils/types';
import { twMerge } from 'tailwind-merge';

const HeaderTitle: React.FC<WithComponentProps<'h1'>> = ({
  innerRef,
  className,
  ...props
}) => (
  <h1
    ref={innerRef}
    className={twMerge(
      'text-xl font-bold sm:text-2xl md:text-3xl',
      className,
    )}
    {...props}
  />
);
export default HeaderTitle;

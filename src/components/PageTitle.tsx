import { twMerge } from 'tailwind-merge';
import { WithComponentProps } from '@/utils/types';

const PageTitle: React.FC<WithComponentProps<'h1'>> = ({
  children,
  className,
  ...props
}) => (
  <h1
    {...props}
    className={twMerge(
      'mb-4 text-3xl font-medium sm:text-4xl md:mb-6 md:mt-12 md:text-5xl',
      className,
    )}
  >
    {children}
  </h1>
);

export default PageTitle;

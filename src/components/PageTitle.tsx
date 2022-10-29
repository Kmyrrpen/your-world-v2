import classNames from 'classnames';
import { ComponentPropsWithoutRef } from 'react';

const PageTitle: React.FC<ComponentPropsWithoutRef<'h1'>> = ({
  children,
  className,
  ...props
}) => (
  <h1
    {...props}
    className={classNames(
      className,
      'mb-4 text-3xl font-medium sm:text-4xl md:mb-6 md:mt-12 md:text-5xl',
    )}
  >
    {children}
  </h1>
);

export default PageTitle;

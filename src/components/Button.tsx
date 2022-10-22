import { Polymorphic } from '@/utils';
import classNames from 'classnames';
import React from 'react';

const Button = <C extends React.ElementType = 'button'>({
  as,
  children,
  className,
  ...props
}: Polymorphic<C>) => {
  const Component = as || 'button';

  return (
    <Component
      className={classNames(
        'rounded bg-primary-100 px-8 py-2 text-base text-white dark:bg-primary-100-dark',
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Button;

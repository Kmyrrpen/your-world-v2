import { Polymorphic } from '@/utils';
import classNames from 'classnames';
import React from 'react';

const Container = <C extends React.ElementType = 'div'>({
  as,
  children,
  className,
  ...props
}: Polymorphic<C>) => {
  const Component = as || 'div';

  return (
    <Component
      className={classNames(
        'w-full max-w-lg px-4 sm:max-w-2xl md:max-w-4xl lg:max-w-6xl',
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Container;

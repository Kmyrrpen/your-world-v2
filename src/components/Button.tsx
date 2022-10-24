import React from 'react';
import classNames from 'classnames';
import { Polymorphic } from '@/utils';

type Props = {
  color?: 'primary' | 'secondary';
  size?: 'large' | 'default';
};

const Button = <C extends React.ElementType = 'button'>({
  as,
  children,
  className,
  size,
  color,
  ...props
}: Polymorphic<C, Props>) => {
  const Component = as || 'button';
  const _size = size || 'default';
  const _color = color || 'primary';

  return (
    <Component
      className={classNames(
        'rounded px-8 text-base text-white',
        { 'py-2': _size === 'default' },
        { 'py-3': _size === 'large' },
        { 'bg-primary-200 dark:bg-primary-200-dark': _color === 'primary' },
        { 'bg-primary-100 dark:bg-primary-100-dark': _color === 'secondary' },
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Button;

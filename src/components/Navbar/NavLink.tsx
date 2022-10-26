import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Polymorphic } from '@/utils';

const NavLink = <C extends React.ElementType = typeof Link>({
  as,
  className,
  children,
  ...props
}: Polymorphic<C>) => {
  const Component = as || Link;
  return (
    <Component
      to={props.to}
      className={classNames(
        'block rounded py-2 px-4 md:p-0 md:text-lg',
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
};

export default NavLink;

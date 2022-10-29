import { ComponentPropsWithoutRef } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

export const Item: React.FC<ComponentPropsWithoutRef<'li'>> = ({
  className,
  children,
  ...props
}) => (
  <li
    className={classNames(
      className,
      'flex w-full flex-col gap-2 rounded border border-zinc-200 p-4 dark:border-zinc-600',
    )}
    {...props}
  >
    {children}
  </li>
);

export const ItemTitle: React.FC<ComponentPropsWithoutRef<'h2'>> = ({
  className,
  children,
  ...props
}) => (
  <h2 className={classNames(className, 'text-xl font-semibold')} {...props}>
    {children}
  </h2>
);

export const ItemDescription: React.FC<ComponentPropsWithoutRef<'p'>> = ({
  className,
  children,
  ...props
}) => (
  <p className={classNames(className, 'text-sm line-clamp-3')} {...props}>
    {children}
  </p>
);

export const ItemLink: React.FC<ComponentPropsWithoutRef<typeof Link>> = ({
  className,
  children,
  ...props
}) => (
  <Link
    className={classNames(className, 'ml-auto mt-auto font-bold')}
    {...props}
  >
    {children}
  </Link>
);

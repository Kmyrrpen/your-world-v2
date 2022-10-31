import { ComponentPropsWithoutRef } from 'react';
import { twMerge } from 'tailwind-merge';

const ItemTitle: React.FC<ComponentPropsWithoutRef<'h2'>> = ({
  className,
  children,
  ...props
}) => (
  <h2 className={twMerge('text-xl font-semibold ', className)} {...props}>
    {children}
  </h2>
);

export default ItemTitle;
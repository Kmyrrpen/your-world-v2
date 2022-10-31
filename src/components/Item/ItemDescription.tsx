import { ComponentPropsWithoutRef } from 'react';
import { twMerge } from 'tailwind-merge';

const ItemDescription: React.FC<ComponentPropsWithoutRef<'p'>> = ({
  className,
  children,
  ...props
}) => (
  <p className={twMerge('text-sm line-clamp-3 ', className)} {...props}>
    {children}
  </p>
);

export default ItemDescription;
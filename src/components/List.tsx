import { twMerge } from 'tailwind-merge';
import { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'ul'>;
const List: React.FC<Props> = ({ className, children, ...props }) => (
  <ul
    className={twMerge('row-auto grid gap-3 pb-6 md:grid-cols-2 ', className)}
    {...props}
  >
    {children}
  </ul>
);

export default List;

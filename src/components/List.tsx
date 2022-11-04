import { twMerge } from 'tailwind-merge';
import { WithComponentProps } from '@/utils/types';

const List: React.FC<WithComponentProps<'ul'>> = ({ className, children, ...props }) => (
  <ul
    className={twMerge('row-auto grid gap-3 pb-6 md:grid-cols-2 ', className)}
    {...props}
  >
    {children}
  </ul>
);

export default List;

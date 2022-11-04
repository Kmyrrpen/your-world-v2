import { WithComponentProps } from '@/utils/types';
import { twMerge } from 'tailwind-merge';

const ItemTitle: React.FC<WithComponentProps<'h2'>> = ({
  className,
  children,
  ...props
}) => (
  <h2 className={twMerge('text-xl font-semibold ', className)} {...props}>
    {children}
  </h2>
);

export default ItemTitle;

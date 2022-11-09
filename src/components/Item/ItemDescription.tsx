import { WithComponentProps } from '@/utils/types';
import { twMerge } from 'tailwind-merge';

const ItemDescription: React.FC<WithComponentProps<'p'>> = ({
  className,
  children,
  innerRef,
  ...props
}) => (
  <p ref={innerRef} className={twMerge('text-sm line-clamp-3 ', className)} {...props}>
    {children}
  </p>
);

export default ItemDescription;

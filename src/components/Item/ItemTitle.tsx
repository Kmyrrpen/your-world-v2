import { WithComponentProps } from '@/utils/types';
import { twMerge } from 'tailwind-merge';

const ItemTitle: React.FC<WithComponentProps<'h2'>> = ({
  innerRef,
  className,
  ...props
}) => (
  <h2 ref={innerRef} className={twMerge('text-lg font-bold', className)} {...props} />
);

export default ItemTitle;

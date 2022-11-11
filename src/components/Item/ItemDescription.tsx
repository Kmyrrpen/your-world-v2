import { WithComponentProps } from '@/utils/types';
import { twMerge } from 'tailwind-merge';

const ItemDescription: React.FC<WithComponentProps<'p'>> = ({
  innerRef,
  className,
  ...props
}) => (
  <p
    ref={innerRef}
    className={twMerge('flex flex-col p-2', className)}
    {...props}
  />
);

export default ItemDescription;

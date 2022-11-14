import { WithComponentProps } from '@/utils/types';
import { twMerge } from 'tailwind-merge';

const Item: React.FC<WithComponentProps<'li'>> = ({
  innerRef,
  className,
  ...props
}) => (
  <li
    ref={innerRef}
    className={twMerge('flex flex-col gap-1 border border-neutral-400 p-2 sm:p-3', className)}
    {...props}
  />
);

export default Item;

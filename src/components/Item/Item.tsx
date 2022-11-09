import { WithComponentProps } from '@/utils/types';
import { twMerge } from 'tailwind-merge';

const Item: React.FC<WithComponentProps<'li'>> = ({
  innerRef,
  className,
  children,
  ...props
}) => (
  <li
    ref={innerRef}
    className={twMerge(
      'flex w-full flex-col gap-2 rounded border border-zinc-200 bg-white p-4 dark:border-zinc-600 dark:bg-dark-200 ',
      className,
    )}
    {...props}
  >
    {children}
  </li>
);

export default Item;

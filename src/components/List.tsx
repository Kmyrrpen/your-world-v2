import { twMerge } from 'tailwind-merge';
import { WithComponentProps } from '@/utils/types';

const List: React.FC<WithComponentProps<'ul'>> = ({
  className,
  innerRef,
  ...props
}) => (
  <ul
    ref={innerRef}
    className={twMerge('row-auto grid gap-3 pb-6 md:grid-cols-2 ', className)}
    {...props}
  />
);

export default List;

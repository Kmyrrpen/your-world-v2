import { WithComponentProps } from '@/utils/types';
import { Link } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

const ItemLink: React.FC<WithComponentProps<typeof Link>> = ({
  className,
  children,
  ...props
}) => (
  <Link className={twMerge('ml-auto mt-auto font-bold ', className)} {...props}>
    {children}
  </Link>
);

export default ItemLink;

import { WithComponentProps } from '@/utils/types';
import { Link } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import IconButton from '../IconButton';
import { Icons } from '../Icons';

const ItemLink: React.FC<Omit<WithComponentProps<typeof Link>, 'children'>> = ({
  className,
  innerRef,
  ...linkProps
}) => (
  <IconButton
    className={twMerge('ml-auto mt-auto', className)}
    render={({ ...props }) => <Link ref={innerRef} {...props} {...linkProps} />}
  >
    <span className="hidden font-bold md:block">Edit</span>
    <Icons.ArrowRight />
  </IconButton>
);

export default ItemLink;

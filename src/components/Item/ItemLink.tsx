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
    <div className='flex gap-2'>
      <span className='font-bold hidden md:block'>Edit</span>
      <Icons.ArrowRight />
    </div>
  </IconButton>
);

export default ItemLink;

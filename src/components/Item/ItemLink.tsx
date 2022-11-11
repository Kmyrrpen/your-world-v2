import { WithComponentProps } from '@/utils/types';
import { Link } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import Button from '../Button';

const ItemLink: React.FC<WithComponentProps<typeof Link>> = ({
  className,
  innerRef,
  children,
  ...linkProps
}) => (
  <Button
    icon="arr-right"
    className={twMerge('ml-auto mt-auto', className)}
    render={({ ...props }) => <Link ref={innerRef} {...props} {...linkProps} />}
  >
    {children}
  </Button>
);

export default ItemLink;

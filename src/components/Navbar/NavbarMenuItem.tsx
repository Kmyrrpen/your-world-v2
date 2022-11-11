import { WithComponentProps } from '@/utils/types';
import { twMerge } from 'tailwind-merge';

const NavbarMenuItem: React.FC<WithComponentProps<'li'>> = ({
  innerRef,
  className,
  ...props
}) => (
  <li
    className={twMerge('p-1.5 px-2 sm:px-4', className)}
    ref={innerRef}
    {...props}
  />
);

export default NavbarMenuItem;

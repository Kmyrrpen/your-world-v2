import { ComponentPropsWithoutRef, forwardRef } from 'react';
import { Link } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

import IconButton from '../IconButton';
import Icons from '../Icons';

type Props = Omit<ComponentPropsWithoutRef<typeof Link>, 'children'>;

const ItemLink = forwardRef<HTMLAnchorElement, Props>(
  ({ className, ...props }, ref) => {
    return (
      <IconButton
        ref={ref}
        as={Link}
        className={twMerge('ml-auto mt-auto', className)}
        {...props}
      >
        <span className="hidden font-bold md:block">Edit</span>
        <Icons.ArrowRight />
      </IconButton>
    );
  },
);

export default ItemLink;

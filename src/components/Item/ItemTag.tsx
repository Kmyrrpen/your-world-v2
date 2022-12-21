import { Tag } from '@/app/world-curr/types';
import { ComponentPropsWithoutRef, forwardRef } from 'react';
import { Link } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

type Props = {
  tag: Tag;
} & ComponentPropsWithoutRef<typeof Link>;

const ItemTag = forwardRef<HTMLAnchorElement, Props>(
  ({ tag, className, style, ...props }, ref) => {
    return (
      <Link
        ref={ref}
        style={{
          backgroundColor: tag.color.background,
          color: tag.color.text,
          ...style,
        }}
        className={twMerge(
          'mr-1 mb-1 inline py-1 px-2 text-sm font-medium leading-none',
          className,
        )}
        {...props}
      >
        {tag.name}
      </Link>
    );
  },
);

export default ItemTag;

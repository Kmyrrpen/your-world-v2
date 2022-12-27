import { polyRef } from '@/utils';
import { twMerge } from 'tailwind-merge';

const ItemGrid = polyRef<'div', { className?: string }>(
  ({ as: As = 'div', className, ...props }, ref) => (
    <As
      ref={ref}
      className={twMerge('grid grid-cols-1 gap-4 lg:grid-cols-2', className)}
      {...props}
    />
  ),
);

export default ItemGrid;

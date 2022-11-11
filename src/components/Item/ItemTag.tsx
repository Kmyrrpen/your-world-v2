import { Tag } from '@/app/world/types';
import { WithComponentProps } from '@/utils/types';
import { twMerge } from 'tailwind-merge';

type Props = {
  tag: Tag;
};

const ItemTag: React.FC<WithComponentProps<'li', Props>> = ({
  tag,
  className,
  style,
  ...props
}) => {
  return (
    <li
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
    </li>
  );
};

export default ItemTag;

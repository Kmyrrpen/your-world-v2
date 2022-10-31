import { Tag } from '@/app/world/types';
import { twMerge } from 'tailwind-merge';

type Props = {
  tag: Tag;
  className?: string;
};

const TagDisplay: React.FC<Props> = ({ tag, className }) => {
  return (
    <li
      style={{ backgroundColor: tag.color.background, color: tag.color.text }}
      className={twMerge(
        'mr-1 mb-1 inline py-1 px-2 text-xs font-medium leading-none',
        className,
      )}
    >
      <span>{tag.name}</span>
    </li>
  );
};

export default TagDisplay;

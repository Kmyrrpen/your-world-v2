import { Tag } from '@/app/world/types';
import { isColorDark } from '@/utils';

type Props = {
  tag: Tag;
};

const TagDisplay: React.FC<Props> = ({ tag }) => {
  return (
    <li
      className="mr-1 py-1 px-2 text-xs leading-none font-medium inline mb-1"
      style={{ backgroundColor: tag.color, color: isColorDark(tag.color) ? "white" : "black" }}
    >
      <span>{tag.name}</span>
    </li>
  );
};

export default TagDisplay;

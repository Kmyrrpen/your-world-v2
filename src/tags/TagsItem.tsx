import { Tag } from '@/app/world-curr/types';
import Item from '@/components/Item';

type Props = {
  tag: Tag;
};

const TagsItem: React.FC<Props> = ({ tag }) => {
  return (
    <Item>
      <Item.Title>
        <span
          className="px-2 leading-none"
          style={{
            backgroundColor: tag.color.background,
            color: tag.color.text,
          }}
        >
          # {tag.name}
        </span>
      </Item.Title>
      <Item.Description>{tag.description}</Item.Description>
      <Item.Link to={`${tag.id}`} />
    </Item>
  );
};

export default TagsItem;

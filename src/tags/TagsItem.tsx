import { Tag } from '@/app/world/types';
import Item from '@/components/Item';

type Props = {
  tag: Tag;
};

const TagsItem: React.FC<Props> = ({ tag }) => {
  return (
    <Item>
      <Item.Title>
        <span
          className='leading-none px-2'
          style={{
            backgroundColor: tag.color.background,
            color: tag.color.text,
          }}
        >
          # {tag.name}
        </span>
      </Item.Title>
      <Item.Description>{tag.description}</Item.Description>
      <Item.Link to={`${tag.id}`}>See Notes</Item.Link>
    </Item>
  );
};

export default TagsItem;

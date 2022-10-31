import { Tag } from '@/app/world/types';
import Item from '@/components/Item';
import TagDisplay from '@/components/TagDisplay';

type Props = {
  tag: Tag;
};

const TagsItem: React.FC<Props> = ({ tag }) => {
  return (
    <Item>
      <Item.Title>
        <TagDisplay tag={tag} className="text-xl" />
      </Item.Title>
      <Item.Description>{tag.description}</Item.Description>
      <Item.Link to={`${tag.id}`}>Open</Item.Link>
    </Item>
  );
};

export default TagsItem;

import { Tag } from '@/app/world/types';
import { Item, ItemDescription, ItemLink, ItemTitle } from '@/components/Item';

type Props = {
  tag: Tag;
};

const TagsItem: React.FC<Props> = ({ tag }) => {
  return (
    <Item>
      <ItemTitle>{tag.name}</ItemTitle>
      <ItemDescription>{tag.description}</ItemDescription>
      <ItemLink to={`${tag.id}`}>Open</ItemLink>
    </Item>
  );
};

export default TagsItem;

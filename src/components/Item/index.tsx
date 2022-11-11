import ItemC from './Item';
import ItemDescription from './ItemDescription';
import ItemLink from './ItemLink';
import ItemTag from './ItemTag';
import ItemTitle from './ItemTitle';

const Item = Object.assign(ItemC, {
  Tag: ItemTag,
  Description: ItemDescription,
  Title: ItemTitle,
  Link: ItemLink,
});

export default Item;

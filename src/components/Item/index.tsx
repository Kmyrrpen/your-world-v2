import ItemComponent from './Item';
import ItemDescription from './ItemDescription';
import ItemTitle from './ItemTitle';
import ItemLink from './ItemLink';

const Item = Object.assign(ItemComponent, {
  Description: ItemDescription,
  Title: ItemTitle,
  Link: ItemLink,
});

export default Item;

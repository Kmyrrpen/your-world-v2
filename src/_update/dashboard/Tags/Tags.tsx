import { useWorldStore } from '@/app/world-curr';
import { stateObjectToArray } from '@/utils';

import TagsItem from './TagItem';
import ItemGrid from '@/components/ItemGrid';

const Tags: React.FC = () => {
  const tags = useWorldStore((state) => stateObjectToArray(state.tags));

  return (
    <>
      <ItemGrid as="ul">
        {tags.map((tag) => (
          <TagsItem tag={tag} key={tag.id} />
        ))}
      </ItemGrid>
    </>
  );
};

export default Tags;

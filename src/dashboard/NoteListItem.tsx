import { useWorld } from '@/app/world/hooks';
import { Note } from '@/app/world/types';

import TagDisplay from '@/components/TagDisplay';
import { Item, ItemDescription, ItemLink, ItemTitle } from '@/components/Item';

type Props = {
  note: Note;
};

const NoteListItem: React.FC<Props> = ({ note }) => {
  const world = useWorld();
  const tagsObj = world.tags;

  return (
    <Item>
      <ItemTitle>{note.name}</ItemTitle>
      <ul className="flex gap-1 line-clamp-1">
        {note.tagIds.map((tagId) => (
          <TagDisplay tag={tagsObj[tagId]} key={tagId} />
        ))}
      </ul>
      <ItemDescription>{note.description}</ItemDescription>
      <ItemLink
        to={`/${world.id}/${note.id}`}
        className="ml-auto mt-auto font-bold"
      >
        Open
      </ItemLink>
    </Item>
  );
};

export default NoteListItem;

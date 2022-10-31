import { useWorld } from '@/app/world/hooks';
import { Note } from '@/app/world/types';
import TagDisplay from '@/components/TagDisplay';
import Item from '@/components/Item';

type Props = {
  note: Note;
};

const NoteListItem: React.FC<Props> = ({ note }) => {
  const world = useWorld();
  const tagsObj = world.tags;

  return (
    <Item>
      <Item.Title>{note.name}</Item.Title>
      <ul className="flex gap-1 line-clamp-1">
        {note.tagIds.map((tagId) => (
          <TagDisplay tag={tagsObj[tagId]} key={tagId} />
        ))}
      </ul>
      <Item.Description>{note.description}</Item.Description>
      <Item.Link
        to={`/${world.id}/${note.id}`}
        className="ml-auto mt-auto font-bold"
      >
        Open
      </Item.Link>
    </Item>
  );
};

export default NoteListItem;

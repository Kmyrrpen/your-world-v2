import { useWorld } from '@/app/world/hooks';
import { Note, TagsObject } from '@/app/world/types';
import { Link } from 'react-router-dom';

type Props = {
  note: Note;
  tagsObj: TagsObject;
};

const NoteListItem: React.FC<Props> = ({ note, tagsObj }) => {
  const world = useWorld();

  return (
    <li>
      <h2>{note.name}</h2>
      <ul>
        {note.tagIds.map((tagId) => (
          <li key={tagsObj[tagId].id}>{tagsObj[tagId].name}</li>
        ))}
      </ul>
      <p>{note.description}</p>
      <Link to={`/${world.id}/${note.id}`}>Open</Link>
    </li>
  );
};

export default NoteListItem;

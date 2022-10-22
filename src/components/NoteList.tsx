import { Note, TagsObject } from '@/app/world/types';
import NoteListItem from './ListItem';

type Props = {
  notes: Note[];
  tagsObj: TagsObject;
};

const NoteList: React.FC<Props> = ({ notes, tagsObj }) => {
  return (
    <ul>
      {notes.map((note) => (
        <NoteListItem note={note} key={note.id} tagsObj={tagsObj} />
      ))}
    </ul>
  );
};

export default NoteList;

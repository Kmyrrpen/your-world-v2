import { Note } from '@/app/world/types';
import NoteListItem from './NoteListItem';

type Props = {
  notes: Note[];
};

const NoteList: React.FC<Props> = ({ notes }) => {
  return (
    <ul className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      {notes.map((note) => (
        <NoteListItem note={note} key={note.id} />
      ))}
    </ul>
  );
};

export default NoteList;

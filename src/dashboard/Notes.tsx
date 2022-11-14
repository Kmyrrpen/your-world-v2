import { Note } from '@/app/world/types';
import NoteItem from './NoteItem';

type Props = {
  notes: Note[];
};

const Notes: React.FC<Props> = ({ notes }) => {
  return (
    <ul className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      {notes.map((note) => (
        <NoteItem note={note} key={note.id} />
      ))}
    </ul>
  );
};

export default Notes;

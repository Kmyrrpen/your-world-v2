import { Note } from '@/app/world/types';
import List from '@/components/List';
import NoteListItem from './NoteListItem';

type Props = {
  notes: Note[];
};

const NoteList: React.FC<Props> = ({ notes }) => {
  return (
    <List>
      {notes.map((note) => (
        <NoteListItem note={note} key={note.id} />
      ))}
    </List>
  );
};

export default NoteList;

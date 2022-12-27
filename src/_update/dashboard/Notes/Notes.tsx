import { useWorldStore } from '@/app/world-curr';
import ItemGrid from '@/components/ItemGrid';
import { stateObjectToArray } from '@/utils';
import NoteItem from './NoteItem';

const Notes: React.FC = () => {
  const notes = useWorldStore((state) => stateObjectToArray(state.notes));

  return (
    <ItemGrid as="ul">
      {notes.map((note) => (
        <NoteItem note={note} key={note.id} />
      ))}
    </ItemGrid>
  );
};

export default Notes;

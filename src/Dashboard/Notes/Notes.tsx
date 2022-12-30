import { useWorldStore } from "@/app/world";
import ItemGrid from "@/components/ItemGrid";
import shallow from "zustand/shallow";
import NoteItem from "./NoteItem";

const Notes: React.FC = () => {
  const notes = useWorldStore((state) => Object.values(state.notes), shallow);
  return (
    <ItemGrid>
      <div>I am notes</div>
      {notes.map((note) => (
        <NoteItem note={note} key={note.id} />
      ))}
    </ItemGrid>
  );
};

export default Notes;

import { useMemo, useState } from "react";
import { useWorldStore } from "@/app/world";

import ItemGrid from "@/components/ItemGrid";
import shallow from "zustand/shallow";
import NoteItem from "./NoteItem";

const Notes: React.FC = () => {
  const notes = useWorldStore((state) => Object.values(state.notes), shallow);
  const [inputValue, setInputValue] = useState("");

  const filteredNotes = useMemo(() => {
    const value = inputValue.toLowerCase();
    return notes.filter((note) => note.name.toLowerCase().startsWith(value));
  }, [inputValue, notes]);

  return (
    <div>
      <input
        className="mb-2 w-80 max-w-full border-b-2 border-b-gray-200 outline-none"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <ItemGrid>
        {filteredNotes.map((note) => (
          <NoteItem note={note} key={note.id} />
        ))}
      </ItemGrid>
    </div>
  );
};

export default Notes;

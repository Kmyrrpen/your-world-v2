import { useMemo, useState } from "react";
import { Tag, useWorldStore } from "@/app/world";
import shallow from "zustand/shallow";

import NoteItem from "./NoteItem";
import SearchInput from "@/components/SearchInput";
import TagSearchInput from "./TagSearchInput";

const Notes: React.FC = () => {
  const notes = useWorldStore((state) => Object.values(state.notes), shallow);
  const [inputValue, setInputValue] = useState("");
  const [selectedItems, setSelectedItems] = useState<Tag[]>([]);

  const filteredNotes = useMemo(() => {
    const value = inputValue.toLowerCase();
    return notes.filter(
      (note) =>
        note.name.toLowerCase().startsWith(value) &&
        selectedItems.every((tag) => note.tagIds.includes(tag.id)),
    );
  }, [inputValue, notes, selectedItems]);

  return (
    <div>
      <div className="mb-8">
        <SearchInput
          className="mb-2"
          placeholder="search..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <TagSearchInput
          selectedItems={selectedItems}
          setSelectedItems={setSelectedItems}
        />
      </div>
      <ul className="grid grid-cols-1 gap-2 md:grid-cols-2">
        {filteredNotes.map((note) => (
          <NoteItem note={note} key={note.id} />
        ))}
      </ul>
    </div>
  );
};

export default Notes;

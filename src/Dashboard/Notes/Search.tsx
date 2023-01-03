import { Note, useWorldStore } from "@/app/world";
import { useCombobox } from "downshift";
import React, { useMemo, useState } from "react";
import shallow from "zustand/shallow";

const getItems = (notes: Note[], inputValue: string): Note[] => {
  inputValue = inputValue.toLowerCase();
  return notes.filter((note) => note.name.toLowerCase().startsWith(inputValue));
};

const NoteSearch: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const notes = useWorldStore((state) => Object.values(state.notes), shallow);
  const items = useMemo(() => getItems(notes, inputValue), [inputValue, notes]);

  const {
    isOpen,
    getInputProps,
    getItemProps,
    getMenuProps,
    highlightedIndex,
  } = useCombobox({
    items,
    inputValue,
    defaultHighlightedIndex: 0,
    onInputValueChange({ inputValue }) {
      if (inputValue) setInputValue(inputValue);
    },
    onSelectedItemChange({ selectedItem }) {
      if (selectedItem) {
        ("");
      }
    },
  });

  return <div></div>;
};

export default NoteSearch;

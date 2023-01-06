import React, { useEffect, useMemo, useRef, useState } from "react";
import { useCombobox } from "downshift";
import shallow from "zustand/shallow";
import { twMerge } from "tailwind-merge";

import { Note, useWorldStore } from "@/app/world";
import Modal from "@/components/Modal";
import FormField from "@/components/FormField";
import { useEditorContext } from "./store";

const getItems = (notes: Note[], draft: Note, inputValue: string): Note[] => {
  inputValue = inputValue.toLowerCase();
  return notes.filter(
    (note) =>
      draft.id !== note.id && note.name.toLowerCase().startsWith(inputValue),
  );
};

const LinkModal: React.FC = () => {
  const { draft, editor } = useEditorContext();
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState("");
  const { id, notes } = useWorldStore(
    (state) => ({ id: state.id, notes: Object.values(state.notes) }),
    shallow,
  );
  const items = useMemo(
    () => getItems(notes, draft, inputValue),
    [inputValue, notes],
  );

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const {
    getLabelProps,
    getInputProps,
    getItemProps,
    getMenuProps,
    highlightedIndex,
  } = useCombobox({
    items,
    inputValue,
    initialHighlightedIndex: 0,
    isOpen: true,
    onInputValueChange({ inputValue }) {
      if (inputValue !== undefined) setInputValue(inputValue);
    },
  });

  const onClose = () => {
    editor.chain().toggleLinkModal().focus().run();
  };
  const onAttachLink = () => {
    // use `highlightedIndex` instead of just grabbing `selectedItem` because
    // this fires before downshift gets to update `selectedItem` to the correct one
    const selectedItem = items[highlightedIndex];
    const href = selectedItem ? `/${id}/${selectedItem.id}` : inputValue;
    editor.chain().focus().extendMarkRange("link").setLink({ href }).run();
    onClose();
  };

  return (
    <Modal onClose={onClose}>
      <FormField>
        <FormField.Label htmlFor="link-input" {...getLabelProps()}>
          attach link
        </FormField.Label>
        <FormField.Input
          id="link-input"
          {...getInputProps({
            ref: inputRef,
            onKeyDown: (event) => {
              if (event.key === "Enter") onAttachLink();
            },
          })}
        />
      </FormField>
      <ul {...getMenuProps()}>
        {items.map((item, index) => (
          <li
            className={twMerge(
              "border-b-2 border-b-gray-200 py-1 px-1 last:border-b-0",
              highlightedIndex === index && "bg-gray-200",
            )}
            key={item.id}
            {...getItemProps({
              item,
              index,
              onClick: () => onAttachLink(),
            })}
          >
            {item.name}
          </li>
        ))}
      </ul>
    </Modal>
  );
};

export default LinkModal;

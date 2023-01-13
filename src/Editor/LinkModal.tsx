import React, { useEffect, useMemo, useRef, useState } from "react";
import { useCombobox } from "downshift";
import shallow from "zustand/shallow";
import { twMerge } from "tailwind-merge";

import { Note, useWorldStore } from "@/app/world";
import Modal from "@/components/Modal";
import FormField from "@/components/FormField";
import { useEditorContext } from "./store";
import useKeyboardShortcut from "@/hooks/useKeyboardShortcut";

const getItems = (notes: Note[], draft: Note, inputValue: string): Note[] => {
  inputValue = inputValue.toLowerCase();
  return notes.filter(
    (note) =>
      draft.id !== note.id && note.name.toLowerCase().startsWith(inputValue),
  );
};

const _LinkModal: React.FC = () => {
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
    itemToString(item) {
      return item?.name || "";
    },
  });

  const onClose = () => {
    editor.chain().toggleLinkModal().focus().run();
  };

  useKeyboardShortcut(onClose, { key: "Escape" });

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
      <form className="w-full">
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
        <span className="font-sans text-xs text-gray-400">
          attach a note instead:
        </span>
        <ul className="max-h-48" {...getMenuProps()}>
          {items.map((item, index) => (
            <li
              className={twMerge(
                "border-b-gray-200 py-1 px-2",
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
      </form>
    </Modal>
  );
};

const LinkModal: React.FC = () => {
  const { editor } = useEditorContext();
  if (!editor.storage.linkModal.show) return null;
  return <_LinkModal />;
};

export default LinkModal;

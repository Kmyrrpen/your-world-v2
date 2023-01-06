import React, { createContext, useContext, useEffect, useState } from "react";
import { Editor, useEditor } from "@tiptap/react";
import { Note, useWorldStore } from "@/app/world";

import { emptyNote, getDescription } from "./utils";

import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import LinkModal from "./extensions/LinkModal";
import shallow from "zustand/shallow";
import { useNavigate } from "react-router-dom";

export type EditorContext = {
  editor: Editor;
  draft: Note;
};

export type EditorActionsContext = {
  setDraft: React.Dispatch<React.SetStateAction<Note>>;
  saveNote: () => void;
  deleteNote: () => void;
};

// logic shared across editor is stored here.
export const useEditorInit = (note: Note | undefined) => {
  const [draft, setDraft] = useState<Note>(() => note || emptyNote());
  const editor = useEditor({
    content: draft.content,
    editable: true,
    extensions: [
      StarterKit.configure({ heading: { levels: [2, 3, 4] } }),
      Link.configure({ openOnClick: false, autolink: false }),
      LinkModal,
    ],
  });

  const navigate = useNavigate();
  const { set, remove } = useWorldStore(
    (state) => ({ set: state.setNote, remove: state.deleteNote }),
    shallow,
  );

  const saveNote = () => {
    if (!editor) return;
    const content = editor.getHTML();
    set({
      ...draft,
      name: draft.name || "Title",
      content,
      description: getDescription(content),
    });
  };

  const deleteNote = () => {
    remove(draft);
    navigate("../");
  };

  // listen to save shortcut
  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      const mod = e.ctrlKey || e.metaKey;
      if (mod && e.key === "s") {
        e.preventDefault();
        saveNote();
      }
    };
    window.addEventListener("keydown", listener);
    return () => window.removeEventListener("keydown", listener);
  }, [saveNote]);

  useEffect(() => () => editor?.destroy(), []);
  return { draft, editor, setDraft, saveNote, deleteNote };
};

export const editorContext = createContext({} as EditorContext);
export const editorActionsContext = createContext({} as EditorActionsContext);

export const useEditorContext = () => useContext(editorContext);
export const useEditorActionsContext = () => useContext(editorActionsContext);

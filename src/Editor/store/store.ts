import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { Editor, useEditor } from "@tiptap/react";
import { Note, useWorldStore } from "@/app/world";

import { emptyNote, getDescription } from "./utils";

import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import LinkModal from "./extensions/LinkModal";

export type EditorContext = {
  editor: Editor;
  draft: Note;
};

export type EditorSetContext = {
  setDraft: React.Dispatch<React.SetStateAction<Note>>;
  saveNote: () => void;
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
  const setNote = useWorldStore((state) => state.setNote);

  const saveNote = useCallback(() => {
    if (!editor) return;
    const content = editor.getHTML();
    setNote({
      ...draft,
      name: draft.name || "Title",
      content,
      description: getDescription(content),
    });
  }, [setNote, editor, draft]);

  // destroy editor on unmount
  useEffect(() => () => editor?.destroy(), []);

  // listen to save shortcut
  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      const mod = e.ctrlKey || e.metaKey;
      if (mod && e.key === "s") {
        console.log("saved");
        e.preventDefault();
        saveNote();
      }
    };
    window.addEventListener("keydown", listener);
    return () => window.removeEventListener("keydown", listener);
  }, [saveNote]);

  // debounced save after timeout done
  useEffect(() => {
    const timer = setTimeout(() => {
      saveNote();
    }, 5000);
    return () => {
      clearTimeout(timer);
    };
  }, [saveNote]);

  return { draft, setDraft, editor, saveNote };
};

export const editorContext = createContext({} as EditorContext);
export const editorSetContext = createContext({} as EditorSetContext);

export const useEditorState = () => useContext(editorContext);
export const useEditorStateActions = () => useContext(editorSetContext);

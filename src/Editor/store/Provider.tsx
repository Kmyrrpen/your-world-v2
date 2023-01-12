import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "react-toastify";
import { Editor, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import { useNavigate } from "react-router-dom";
import shallow from "zustand/shallow";

import LinkModal from "./extensions/LinkModal";
import useKeyboardShortcut from "@/hooks/useKeyboardShortcut";
import useDebounce from "@/hooks/useDebounce";
import { Note, useWorldStore } from "@/app/world";

import { Action } from "@/utils/types";
import { emptyDraft, getDescription } from "./utils";

export type EditorDraft = Note & { isFresh: boolean };
export type EditorContext = {
  editor: Editor;
  draft: EditorDraft;
};

export type EditorActionsContext = {
  setTagIds: Action<string[] | ((state: string[]) => string[])>;
  setTitle: Action<string>;
  makeStale: () => void;
  saveNote: () => void;
  deleteNote: () => void;
};

export const editorContext = createContext({} as EditorContext);
export const editorActionsContext = createContext({} as EditorActionsContext);
export const useEditorContext = () => useContext(editorContext);
export const useEditorActionsContext = () => useContext(editorActionsContext);

// logic shared across editor is stored here.
export const EditorProvider: React.FC<
  PropsWithChildren<{ note: Note | undefined }>
> = ({ note, children }) => {
  const [draft, setDraft] = useState<EditorDraft>(
    note ? { ...note, isFresh: true } : emptyDraft(),
  );

  const editor = useEditor({
    content: draft.content,
    editable: true,
    extensions: [
      StarterKit.configure({ heading: { levels: [2, 3, 4] } }),
      Link.configure({ openOnClick: false, autolink: false }),
      LinkModal,
    ],
  });

  useEffect(() => () => editor?.destroy(), []);

  const navigate = useNavigate();
  const { set, remove } = useWorldStore(
    (state) => ({ set: state.setNote, remove: state.deleteNote }),
    shallow,
  );

  // actions
  const makeStale = () => setDraft((state) => ({ ...state, isFresh: false }));

  const setTagIds = (payload: string[] | ((state: string[]) => string[])) => {
    setDraft((state) => ({
      ...state,
      tagIds: typeof payload === "function" ? payload(state.tagIds) : payload,
    }));
    makeStale();
  };

  const setTitle = (payload: string) => {
    setDraft((state) => ({ ...state, name: payload }));
    makeStale();
  };

  const saveNote = async () => {
    if (draft.isFresh) return;
    const content = editor?.getHTML() || draft.content;
    // save to global store
    await set({
      ...draft,
      name: draft.name || "Title",
      content,
      description: getDescription(content),
    });
    toast.success("Progress saved.", {
      autoClose: 1000,
      closeButton: false,
    });
    setDraft((state) => ({ ...state, isFresh: true }));
  };

  const deleteNote = () => {
    remove(draft);
    navigate("../");
    toast.success("Note deleted.", {
      autoClose: 1000,
      closeButton: false,
    });
  };

  // attach editor event listeners
  const debouncedSave = useDebounce(saveNote, 10_000);
  useEffect(() => {
    const onUpdate = () => {
      makeStale();
      debouncedSave();
    };
    editor?.on("update", onUpdate);
    return () => {
      editor?.off("update", onUpdate);
    };
  }, [saveNote, makeStale]);

  // listen to save shortcut
  useKeyboardShortcut(saveNote, { key: "s", mod: true });

  if (!editor || !draft) return null;
  return (
    <editorContext.Provider value={{ draft, editor }}>
      <editorActionsContext.Provider
        value={{ saveNote, deleteNote, makeStale, setTitle, setTagIds }}
      >
        {children}
      </editorActionsContext.Provider>
    </editorContext.Provider>
  );
};

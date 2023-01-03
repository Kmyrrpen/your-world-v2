import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Editor } from "@tiptap/react";
import shallow from "zustand/shallow";
import { Note, useWorldStore } from "@/app/world";

import Button from "@/components/Button";
import { getDescription } from "./misc/tiptap";

type Props = {
  draft: Note;
  editor: Editor;
};

const EditorNavbar: React.FC<Props> = ({ draft, editor }) => {
  const navigate = useNavigate();
  const { notes, createNote, deleteNote } = useWorldStore(
    (state) => ({
      notes: state.notes,
      createNote: state.setNote,
      deleteNote: state.deleteNote,
    }),
    shallow,
  );

  const onSave = () => {
    const content = editor.getHTML();
    createNote({
      ...draft,
      name: draft.name || "Title",
      content,
      description: getDescription(content),
    });
  };

  // debounced save after timeout done
  useEffect(() => {
    const timer = setTimeout(() => {
      onSave();
    }, 5000);
    return () => {
      clearTimeout(timer);
    };
  }, [editor.state.doc.content]);

  const onDelete = async () => {
    await deleteNote(draft);
    navigate("../");
  };

  return (
    <nav className="mb-16 flex items-center justify-end">
      {notes[draft.id] ? <Button onClick={onDelete}>delete</Button> : null}
      <Button onClick={onSave}>save</Button>
    </nav>
  );
};

export default EditorNavbar;

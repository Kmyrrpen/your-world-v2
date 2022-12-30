import { useNavigate } from "react-router-dom";
import { Editor } from "@tiptap/react";
import shallow from "zustand/shallow";

import { getDescription } from "./misc/utils";
import { Note, useWorldStore } from "@/app/world";
import Button from "@/components/Button";

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
    createNote({ ...draft, content, description: getDescription(content) });
  };

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

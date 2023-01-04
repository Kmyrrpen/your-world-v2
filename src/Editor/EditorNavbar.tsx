import { useNavigate } from "react-router-dom";
import shallow from "zustand/shallow";
import { useWorldStore } from "@/app/world";

import Button from "@/components/Button";
import { useEditorState, useEditorStateActions } from "./store/store";

const EditorNavbar: React.FC = () => {
  const { saveNote } = useEditorStateActions();
  const { draft } = useEditorState();
  const navigate = useNavigate();

  const { notes, deleteNote } = useWorldStore(
    (state) => ({
      notes: state.notes,
      deleteNote: state.deleteNote,
    }),
    shallow,
  );

  const onDelete = async () => {
    await deleteNote(draft);
    navigate("../");
  };

  return (
    <nav className="mb-16 flex items-center justify-end">
      {notes[draft.id] ? <Button onClick={onDelete}>delete</Button> : null}
      <Button onClick={saveNote}>save</Button>
    </nav>
  );
};

export default EditorNavbar;

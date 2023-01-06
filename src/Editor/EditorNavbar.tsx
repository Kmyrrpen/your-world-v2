import { useNavigate } from "react-router-dom";
import shallow from "zustand/shallow";
import { useWorldStore } from "@/app/world";

import Button from "@/components/Button";
import { useEditorContext, useEditorActionsContext } from "./store/store";
import Navbar from "@/components/Navbar";

const EditorNavbar: React.FC = () => {
  const { saveNote } = useEditorActionsContext();
  const { draft } = useEditorContext();
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
    <Navbar>
      {notes[draft.id] ? <Button onClick={onDelete}>delete</Button> : null}
      <Button onClick={saveNote}>save</Button>
    </Navbar>
  );
};

export default EditorNavbar;

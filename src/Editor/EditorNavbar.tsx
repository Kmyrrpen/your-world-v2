import { useWorldStore } from "@/app/world";
import { useEditorContext, useEditorActionsContext } from "./store/Provider";
import Button from "@/components/Button";
import Navbar from "@/components/Navbar";

const EditorNavbar: React.FC = () => {
  const { saveNote, deleteNote } = useEditorActionsContext();
  const { draft } = useEditorContext();
  const notes = useWorldStore((state) => state.notes);

  return (
    <Navbar>
      {notes[draft.id] ? <Button onClick={deleteNote}>delete</Button> : null}
      <Button
        disabled={draft.isFresh}
        style={draft.isFresh ? "disabled" : "default"}
        onClick={saveNote}
      >
        save
      </Button>
    </Navbar>
  );
};

export default EditorNavbar;

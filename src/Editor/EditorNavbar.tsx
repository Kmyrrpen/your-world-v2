import { useWorldStore } from "@/app/world";
import { useEditorContext, useEditorActionsContext } from "./store/Provider";
import Button from "@/components/Button";
import Navbar from "@/components/Navbar";
import Navlink from "@/components/Navlink";
import Icons from "@/assets/icons";

const EditorNavbar: React.FC = () => {
  const { saveNote, deleteNote } = useEditorActionsContext();
  const { draft } = useEditorContext();
  const notes = useWorldStore((state) => state.notes);

  return (
    <Navbar>
      <Navlink to={"../"}>
        <Icons.ArrowLeft />
        <span>Back</span>
      </Navlink>
      <div className="ml-auto flex items-center gap-1">
        {notes[draft.id] ? <Button onClick={deleteNote}>delete</Button> : null}
        <Button
          disabled={draft.isFresh}
          style={draft.isFresh ? "disabled" : "default"}
          onClick={saveNote}
        >
          save
        </Button>
      </div>
    </Navbar>
  );
};

export default EditorNavbar;

import { dispatch } from "@/app/dispatch";
import { createNote, deleteNote } from "@/app/world";
import { Note } from "@/app/world/types";
import { useNotesObj } from "@/app/world/hooks";
import { Link, useNavigate } from "react-router-dom";

type Props = {
  draft: Note;
};

const EditorNavbar: React.FC<Props> = ({ draft }) => {
  const notesObj = useNotesObj();
  const navigate = useNavigate();

  const onSave = () => dispatch(createNote(draft));
  const onDelete = () => {
    navigate("../");
    dispatch(deleteNote(draft));
  };

  return (
    <div>
      <Link to="../">Back</Link>
      {notesObj[draft.id] ? <button onClick={onDelete}>delete</button> : null}
      <button onClick={onSave}>save</button>
    </div>
  );
};

export default EditorNavbar;

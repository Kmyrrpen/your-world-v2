import { useParams } from "react-router-dom";
import { Note, useWorldStore } from "@/app/world";
import Container from "@/components/Container";
import EditorNavbar from "./EditorNavbar";
import TitleInput from "./TitleInput";
import TagInput from "./TagInput";
import Toolbar from "./Toolbar";
import LinkModal from "./LinkModal";

import { editorContext, editorActionsContext, useEditorInit } from "./store";
import "./misc/editor.css";
import EditorContent from "./EditorContent";

type Props = {
  note?: Note;
};

const _Editor: React.FC<Props> = ({ note }) => {
  const { draft, editor, setDraft, saveNote, deleteNote } = useEditorInit(note);
  if (!editor) return null;
  return (
    <Container>
      <editorContext.Provider value={{ draft, editor }}>
        <editorActionsContext.Provider
          value={{ setDraft, saveNote, deleteNote }}
        >
          <EditorNavbar />
          <TitleInput />
          <TagInput />
          <Toolbar />
          <EditorContent />
          {editor.storage.linkModal.show ? <LinkModal /> : null}
        </editorActionsContext.Provider>
      </editorContext.Provider>
    </Container>
  );
};

// url is either /:id or /new
const Editor: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const notes = useWorldStore((state) => state.notes);
  let note: undefined | Note = undefined;

  if (id) {
    // if id is present but we don't have it, it doesn't exist
    if (!notes[id]) return <div>Error: Note does not exist!</div>;
    note = notes[id];
  }

  return <_Editor note={note} />;
};

export default Editor;

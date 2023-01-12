import { useParams } from "react-router-dom";
import { Note, useWorldStore } from "@/app/world";
import Container from "@/components/Container";
import EditorNavbar from "./EditorNavbar";
import TitleInput from "./TitleInput";
import TagInput from "./TagInput";
import Toolbar from "./Toolbar";
import LinkModal from "./LinkModal";

import { EditorProvider } from "./store";
import EditorContent from "./EditorContent";
import "./misc/editor.css";
import LoadingMessage from "@/components/LoadingMessage";

type Props = {
  note?: Note;
};

const _Editor: React.FC<Props> = ({ note }) => {
  return (
    <Container>
      <EditorProvider note={note}>
        <EditorNavbar />
        <TitleInput />
        <TagInput />
        <Toolbar />
        <EditorContent />
        <LinkModal />
      </EditorProvider>
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
    if (!notes[id])
      return (
        <LoadingMessage>
          <span className="text-highlight-error">Error:</span> Note does not
          exist!
        </LoadingMessage>
      );
    note = notes[id];
  }

  return <_Editor note={note} />;
};

export default Editor;

import { nanoid } from "nanoid";
import { useEffect, useMemo, useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import { useParams } from "react-router-dom";
import { Note, useWorldStore } from "@/app/world";

import Container from "@/components/Container";
import EditorNavbar from "./EditorNavbar";
import TitleInput from "./TitleInput";
import TagInput from "./TagInput";
import Toolbar from "./Toolbar";
import LinkModal from "./LinkModal";

import { createConfiguration } from "./misc/tiptap";
import "./misc/editor.css";

type Props = {
  note?: Note;
};

const emptyNote = (): Note => ({
  name: "",
  content: "",
  description: "",
  id: nanoid(),
  tagIds: [],
});

const _Editor: React.FC<Props> = ({ note }) => {
  const [draft, setDraft] = useState<Note>(() => note || emptyNote());
  const editorConfig = useMemo(() => createConfiguration(draft), [draft]);
  const editor = useEditor(editorConfig);

  useEffect(() => () => editor?.destroy(), []);
  if (!editor) return null;

  return (
    <Container>
      <EditorNavbar editor={editor} draft={draft} />
      <TitleInput editor={editor} draft={draft} setter={setDraft} />
      <TagInput draft={draft} setter={setDraft} />
      <Toolbar editor={editor} />
      <EditorContent
        editor={editor}
        placeholder="Type Here.."
        spellCheck="false"
      />
      {editor.storage.custom.showLinkModal ? (
        <LinkModal editor={editor} />
      ) : null}
    </Container>
  );
};

// url is either /:id or /new
const Editor: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const notes = useWorldStore((state) => state.notes);
  let note: undefined | Note = undefined;

  // if id is undefined, we want to create a new note
  if (id) {
    if (!notes[id]) {
      return <div>Error: Note does not exist!</div>;
    }
    note = notes[id];
  }

  return <_Editor note={note} />;
};

export default Editor;

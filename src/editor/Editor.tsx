import { nanoid } from 'nanoid';
import { useEffect, useMemo, useState } from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import { useParams } from 'react-router-dom';

import { Note } from '@/app/world-curr/types';
import { useWorldStore } from '@/app/world-curr';

import { createConfiguration } from './tiptap';
import Container from '@/components/Container';
import Toolbar from './Toolbar';
import Title from './TitleInput';
import EditorNavbar from './EditorNavbar';
import TagSelect from './TagSelect';
import LinkModal from './LinkModal';
import './editor.css';

type Props = {
  note?: Note;
};

const emptyNote = (): Note => ({
  name: '',
  content: '',
  description: '',
  id: nanoid(),
  tagIds: [],
});

const EditorInner: React.FC<Props> = ({ note }) => {
  const [draft, setDraft] = useState<Note>(() => note || emptyNote());
  const editorConfig = useMemo(() => createConfiguration(draft), [draft]);
  const editor = useEditor(editorConfig);

  useEffect(() => () => editor?.destroy(), []);
  if (!editor) return null;

  return (
    <Container>
      <EditorNavbar editor={editor} draft={draft} />
      <LinkModal editor={editor} />
      <Title editor={editor} draft={draft} setter={setDraft} />
      <TagSelect draft={draft} setter={setDraft} />
      <Toolbar editor={editor} />
      <EditorContent
        editor={editor}
        placeholder="Type Here.."
        spellCheck="false"
      />
    </Container>
  );
};

const Editor: React.FC<Props> = () => {
  const { id } = useParams<{ id: string }>();
  const notes = useWorldStore((state) => state.notes);
  const note = id === 'new' ? undefined : id && notes[id] ? notes[id] : 'error';

  if (note === 'error') {
    return <div>Error: Note does not exist!</div>;
  }

  return <EditorInner note={note} />;
};

export default Editor;

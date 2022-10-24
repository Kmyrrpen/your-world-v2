import { nanoid } from 'nanoid';
import { useMemo, useState } from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import { useParams } from 'react-router-dom';

import { useNotesObj } from '@/app/world/hooks';
import { Note } from '@/app/world/types';

import { createConfiguration } from './tiptap';
import Toolbar from './Toolbar';
import Title from './TitleInput';
import EditorNavbar from './Navbar';
import TagSelect from './TagSelect';
import LinkModal from './LinkModal';

type Props = {
  note?: Note;
};

const createNote = (): Note => ({
  name: '',
  content: '',
  description: '',
  id: nanoid(),
  tagIds: [],
});

const EditorInner: React.FC<Props> = ({ note }) => {
  const [draft, setDraft] = useState<Note>(note ? { ...note } : createNote());
  const editorConfig = useMemo(() => createConfiguration(draft), [draft]);
  const editor = useEditor(editorConfig);

  if (!editor) return null;

  return (
    <div>
      <EditorNavbar draft={draft} />
      <LinkModal editor={editor} />
      <Title editor={editor} draft={draft} setter={setDraft} />
      <TagSelect draft={draft} setter={setDraft} />
      <Toolbar editor={editor} />
      <EditorContent editor={editor} spellCheck="false" />
    </div>
  );
};

const Editor: React.FC<Props> = () => {
  const { id } = useParams<{ id: string }>();
  const noteObj = useNotesObj();
  const note =
    id === 'new' ? undefined : id && noteObj[id] ? noteObj[id] : 'error';

  if (note === 'error') {
    return <div>Error: Note does not exist!</div>;
  }

  return <EditorInner note={note} />;
};

export default Editor;

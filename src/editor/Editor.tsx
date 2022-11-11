import { nanoid } from 'nanoid';
import { useEffect, useMemo, useState } from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import { useParams } from 'react-router-dom';
import { cloneDeep } from 'lodash';

import { useNotesObj } from '@/app/world/hooks';
import { Note } from '@/app/world/types';
import Container from '@/components/Container';

import { createConfiguration } from './tiptap';
import Toolbar from './Toolbar';
import Title from './TitleInput';
import EditorNavbar from './EditorNavbar';
import TagSelect from './TagSelect';
import LinkModal from './LinkModal';
import './editor.css';

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
  // deep clone note to convert proxy to a plain object
  const [draft, setDraft] = useState<Note>(() =>
    note ? cloneDeep(note) : createNote(),
  );
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
  const noteObj = useNotesObj();
  const note =
    id === 'new' ? undefined : id && noteObj[id] ? noteObj[id] : 'error';

  if (note === 'error') {
    return <div>Error: Note does not exist!</div>;
  }

  return <EditorInner note={note} />;
};

export default Editor;

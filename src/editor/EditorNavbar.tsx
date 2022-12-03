import { useNavigate } from 'react-router-dom';
import { Editor } from '@tiptap/react';
import shallow from 'zustand/shallow';
import { Note } from '@/app/world-curr/types';
import { useWorldStore } from '@/app/world-curr';

import Navbar from '@/components/Navbar';
import { getDescription } from './utils';

type Props = {
  draft: Note;
  editor: Editor;
};

const EditorNavbar: React.FC<Props> = ({ draft, editor }) => {
  const navigate = useNavigate();
  const { notes, createNote, deleteNote } = useWorldStore(
    (state) => ({
      notes: state.notes,
      createNote: state.setNote,
      deleteNote: state.deleteNote,
    }),
    shallow,
  );

  const onSave = () => {
    const content = editor.getHTML();
    createNote({ ...draft, content, description: getDescription(content) });
  };

  const onDelete = () => {
    deleteNote(draft);
    navigate('../');
  };

  return (
    <Navbar>
      <Navbar.Back />
      <Navbar.Menu>
        {notes[draft.id] ? (
          <Navbar.MenuItem>
            <Navbar.Link
              render={(props) => <button {...props} onClick={onDelete} />}
            >
              delete
            </Navbar.Link>
          </Navbar.MenuItem>
        ) : null}
        <Navbar.MenuItem>
          <Navbar.Link
            render={(props) => <button {...props} onClick={onSave} />}
          >
            save
          </Navbar.Link>
        </Navbar.MenuItem>
      </Navbar.Menu>
    </Navbar>
  );
};

export default EditorNavbar;

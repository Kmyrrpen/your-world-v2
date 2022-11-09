import { useNavigate } from 'react-router-dom';
import { Editor } from '@tiptap/react';

import { createNote, deleteNote } from '@/app/world';
import { useNotesObj } from '@/app/world/hooks';
import { Note } from '@/app/world/types';
import { dispatch } from '@/app/dispatch';

import Navbar from '@/components/Navbar';
import { getDescription } from './utils';

type Props = {
  draft: Note;
  editor: Editor;
};

const EditorNavbar: React.FC<Props> = ({ draft, editor }) => {
  const notesObj = useNotesObj();
  const navigate = useNavigate();

  const onSave = () => {
    const content = editor.getHTML();
    dispatch(
      createNote({ ...draft, content, description: getDescription(content) }),
    );
  };

  const onDelete = () => {
    navigate('../');
    dispatch(deleteNote(draft));
  };

  return (
    <Navbar>
      <Navbar.BackButton />
      <Navbar.Menu>
        {notesObj[draft.id] ? (
          <li>
            <Navbar.Link
              render={(props) => <button {...props} onClick={onDelete} />}
            >
              delete
            </Navbar.Link>
          </li>
        ) : null}
        <li>
          <Navbar.Link
            render={(props) => <button {...props} onClick={onSave} />}
          >
            save
          </Navbar.Link>
        </li>
      </Navbar.Menu>
    </Navbar>
  );
};

export default EditorNavbar;

import { useNavigate } from 'react-router-dom';
import { Editor } from '@tiptap/react';
import { useState } from 'react';

import { dispatch } from '@/app/dispatch';
import { createNote, deleteNote } from '@/app/world';
import { Note } from '@/app/world/types';
import { useNotesObj } from '@/app/world/hooks';
import Navbar from '@/components/Navbar';
import { getDescription } from './utils';

type Props = {
  draft: Note;
  editor: Editor;
};

const EditorNavbar: React.FC<Props> = ({ draft, editor }) => {
  const notesObj = useNotesObj();
  const navigate = useNavigate();

  const [toggle, setToggle] = useState(false);

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
      <Navbar.Toggle onClick={() => setToggle((prev) => !prev)} />
      <Navbar.Menu toggle={toggle}>
        {notesObj[draft.id] ? (
          <li>
            <Navbar.Link as="button" onClick={onDelete}>
              delete
            </Navbar.Link>
          </li>
        ) : null}
        <li>
          <Navbar.Link as="button" onClick={onSave}>
            save
          </Navbar.Link>
        </li>
      </Navbar.Menu>
    </Navbar>
  );
};

export default EditorNavbar;

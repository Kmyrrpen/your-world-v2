import { useNavigate } from 'react-router-dom';
import { Editor } from '@tiptap/react';
import { useState } from 'react';

import { dispatch } from '@/app/dispatch';
import { createNote, deleteNote } from '@/app/world';
import { Note } from '@/app/world/types';
import { useNotesObj } from '@/app/world/hooks';
import { NavBackButton, NavContainer, NavLink, NavMenu, NavToggle } from '@/components/Navbar';
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
    <NavContainer>
      <NavBackButton />
      <NavToggle onClick={() => setToggle((prev) => !prev)} />
      <NavMenu toggle={toggle}>
        {notesObj[draft.id] ? (
          <li>
            <NavLink as="button" onClick={onDelete}>
              delete
            </NavLink>
          </li>
        ) : null}
        <li>
          <NavLink as="button" onClick={onSave}>
            save
          </NavLink>
        </li>
      </NavMenu>
    </NavContainer>
  );
};

export default EditorNavbar;

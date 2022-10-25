import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import { dispatch } from '@/app/dispatch';
import { createNote, deleteNote } from '@/app/world';
import { Note } from '@/app/world/types';
import { useNotesObj } from '@/app/world/hooks';

import NavContainer from '@/components/Navbar/NavContainer';
import NavLink from '@/components/Navbar/NavLink';
import Button from '@/components/Button';
import NavMenu from '@/components/Navbar/NavMenu';
import NavToggle from '@/components/Navbar/NavToggle';

type Props = {
  draft: Note;
};

const EditorNavbar: React.FC<Props> = ({ draft }) => {
  const notesObj = useNotesObj();
  const navigate = useNavigate();

  const [toggle, setToggle] = useState(false);

  const onSave = () => dispatch(createNote(draft));
  const onDelete = () => {
    navigate('../');
    dispatch(deleteNote(draft));
  };

  return (
    <NavContainer>
      <NavLink to="../">Back</NavLink>

      <NavToggle onClick={() => setToggle((prev) => !prev)} />
      <NavMenu toggle={toggle}>
        {notesObj[draft.id] ? (
          <li>
            <NavLink as="button" onClick={onDelete}>
              delete
            </NavLink>
          </li>
        ) : null}
        <li className="md:hidden">
          <NavLink as="button" onClick={onSave}>
            save
          </NavLink>
        </li>
        <li className="hidden md:inline-block">
          <Button onClick={onSave}>save</Button>
        </li>
      </NavMenu>
    </NavContainer>
  );
};

export default EditorNavbar;

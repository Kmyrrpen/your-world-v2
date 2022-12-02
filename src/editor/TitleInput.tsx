import { Note } from '@/app/world-curr/types';
import { Editor } from '@tiptap/react';
import React, { ChangeEvent, SetStateAction } from 'react';

type Props = {
  draft: Note;
  editor: Editor;
  setter: React.Dispatch<SetStateAction<Note>>;
};

const Title: React.FC<Props> = ({ draft, editor, setter }) => {
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setter((note) => ({ ...note, name: e.target.value }));
  };

  return (
    <input
      className="w-full bg-transparent mb-2 sm:mb-4 text-2xl font-medium outline-none sm:text-3xl md:text-4xl"
      disabled={!editor.isEditable}
      value={draft.name}
      onChange={onChange}
      placeholder="Title..."
    />
  );
};

export default Title;

import { Note } from "@/app/world";
import { Editor } from "@tiptap/react";
import React, { ChangeEvent, SetStateAction } from "react";

type Props = {
  draft: Note;
  editor: Editor;
  setter: React.Dispatch<SetStateAction<Note>>;
};

const TitleInput: React.FC<Props> = ({ draft, editor, setter }) => {
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setter((note) => ({ ...note, name: e.target.value }));
  };

  return (
    <input
      className="mb-2 w-full bg-transparent text-2xl font-medium outline-none sm:mb-4 sm:text-3xl md:text-4xl"
      disabled={!editor.isEditable}
      value={draft.name}
      onChange={onChange}
      placeholder="Title..."
    />
  );
};

export default TitleInput;

import React, { ChangeEvent } from "react";
import { useEditorState, useEditorStateActions } from "./store/store";

const TitleInput: React.FC = () => {
  const { draft, editor } = useEditorState();
  const { setDraft } = useEditorStateActions();
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDraft((note) => ({ ...note, name: e.target.value }));
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

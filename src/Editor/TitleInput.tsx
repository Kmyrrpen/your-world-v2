import React, { ChangeEvent, useRef, useEffect } from "react";
import { useEditorContext, useEditorActionsContext } from "./store/store";

const TitleInput: React.FC = () => {
  const { draft, editor } = useEditorContext();
  const { setDraft } = useEditorActionsContext();
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDraft((note) => ({ ...note, name: e.target.value }));
  };

  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <input
      className="mb-2 w-full bg-transparent text-2xl font-medium outline-none sm:mb-4 sm:text-3xl md:text-4xl"
      disabled={!editor.isEditable}
      value={draft.name}
      ref={inputRef}
      onChange={onChange}
      placeholder="Title..."
    />
  );
};

export default TitleInput;

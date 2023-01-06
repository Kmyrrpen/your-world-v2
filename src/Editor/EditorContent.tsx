import useDebounce from "@/hooks/useDebounce";
import { EditorContent as EditorTiptapContent } from "@tiptap/react";
import { useEditorContext, useEditorActionsContext } from "./store";

const EditorContent: React.FC = () => {
  const { editor } = useEditorContext();
  const { saveNote } = useEditorActionsContext();
  const debouncedSave = useDebounce(saveNote, 3000);

  return (
    <EditorTiptapContent
      editor={editor}
      placeholder="Type Here.."
      spellCheck="false"
      onKeyDown={debouncedSave}
    />
  );
};

export default EditorContent;

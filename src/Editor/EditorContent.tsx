import { EditorContent as EditorTiptapContent } from "@tiptap/react";
import { useEditorState } from "./store";

const EditorContext = () => {
  const { editor } = useEditorState();
  return (
    <EditorTiptapContent
      editor={editor}
      placeholder="Type Here.."
      spellCheck="false"
    />
  );
};

export default EditorContext;

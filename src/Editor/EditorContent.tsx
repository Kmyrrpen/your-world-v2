import { EditorContent as EditorTiptapContent } from "@tiptap/react";
import { useEditorState } from "./store";

const EditorContent: React.FC = () => {
  const { editor } = useEditorState();
  return (
    <EditorTiptapContent
      editor={editor}
      placeholder="Type Here.."
      spellCheck="false"
    />
  );
};

export default EditorContent;

import { EditorContent as EditorTiptapContent } from "@tiptap/react";
import { useEditorContext } from "./store";

const EditorContent: React.FC = () => {
  const { editor } = useEditorContext();
  return (
    <EditorTiptapContent
      editor={editor}
      placeholder="Type Here.."
      spellCheck="false"
    />
  );
};

export default EditorContent;

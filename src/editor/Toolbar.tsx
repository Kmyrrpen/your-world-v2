import { Editor } from '@tiptap/react';

type Props = {
  editor: Editor;
};

const cf = (editor: Editor) => editor.chain().focus();
const th = (editor: Editor, level: 1 | 2 | 3 | 4) =>
  cf(editor).toggleHeading({ level }).run();

const Toolbar: React.FC<Props> = ({ editor }) => {
  if (!editor.isEditable) return null;

  return (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <div onClick={() => th(editor, 2)}>H2</div>
      <div onClick={() => th(editor, 3)}>H3</div>
      <div onClick={() => th(editor, 4)}>H4</div>

      <div onClick={() => cf(editor).setParagraph().run()}>P</div>
      <div onClick={() => cf(editor).toggleBulletList().run()}>UL</div>
      <div onClick={() => cf(editor).toggleOrderedList().run()}>OL</div>
      <div onClick={() => editor.commands.toggleLinkModal()}>a</div>
      <div onClick={() => cf(editor).toggleBold().run()}>B</div>
      <div onClick={() => cf(editor).toggleItalic().run()}>I</div>
      <div onClick={() => cf(editor).toggleStrike().run()}>S</div>
    </div>
  );
};

export default Toolbar;

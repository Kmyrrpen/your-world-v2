import { Editor } from '@tiptap/react';
import { useEffect, useRef, useState } from 'react';

type Props = {
  editor: Editor;
};

const LinkModal: React.FC<Props> = ({ editor }) => {
  const [text, setText] = useState('');

  // focus input on mount
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    inputRef.current?.focus();
    return () => {
      editor.commands.toggleLinkModal();
    };
  }, []);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.length > 0) {
      editor
        .chain()
        .focus()
        .extendMarkRange('link')
        .setLink({ href: text })
        .run();
    }

    editor.commands.toggleLinkModal();
  };

  return (
    <form
      id="link-modal"
      aria-modal
      className={!editor.storage.custom.showLinkModal ? 'hidden' : ''}
      onSubmit={onSubmit}
    >
      <span>attach link:</span>
      <input
        ref={inputRef}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
    </form>
  );
};

export default LinkModal;

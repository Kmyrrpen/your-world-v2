import { EditorOptions, Extension } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import { Note } from '@/app/world/types';

declare module '@tiptap/react' {
  interface Commands<ReturnType> {
    customShortcuts: {
      toggleLinkModal: () => ReturnType;
      toggleEditor: () => ReturnType;
    };
  }
}

type Storage = {
  showLinkModal: boolean;
};

const CustomExtension = Extension.create<Record<string, never>, Storage>({
  name: 'custom',
  addStorage() {
    return {
      showLinkModal: false,
    };
  },
  addCommands() {
    return {
      toggleLinkModal:
        () =>
        ({ commands, editor }) => {
          // if its already open, just close it.
          if (this.storage.showLinkModal) {
            this.storage.showLinkModal = false;
            return true;
          }

          const selection = editor.state.selection;
          const noLink = Object.keys(editor.getAttributes('link')).length === 0;

          if (!selection.empty) {
            // show link modal or remove link attached
            if (noLink) {
              this.storage.showLinkModal = true;
            } else commands.unsetLink();
          }

          return true;
        },

      toggleEditor:
        () =>
        ({ editor }) => {
          editor.setEditable(!editor.isEditable);
          return true;
        },
    };
  },
});

export function createConfiguration(note: Note): Partial<EditorOptions> {
  return {
    content: note.content,
    editable: true,
    extensions: [
      CustomExtension,
      Link.configure({ openOnClick: false, autolink: false }),
      StarterKit.configure({ heading: { levels: [2, 3, 4] } }),
    ],
  };
}

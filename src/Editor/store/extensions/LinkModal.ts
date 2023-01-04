import { Extension } from "@tiptap/react";

type Storage = {
  show: boolean;
};

const LinkModal = Extension.create<Record<string, never>, Storage>({
  name: "linkModal",
  addStorage() {
    return {
      show: false,
    };
  },
  addCommands() {
    return {
      toggleLinkModal:
        () =>
        ({ commands, editor }) => {
          // if its already open, just close it.
          if (this.storage.show) {
            this.storage.show = false;
            return true;
          }

          const selection = editor.state.selection;
          const noLink = Object.keys(editor.getAttributes("link")).length === 0;

          if (!selection.empty) {
            // show link modal or remove link attached
            if (noLink) {
              this.storage.show = true;
            } else commands.unsetLink();
          }

          return true;
        }
    }
  },
  addKeyboardShortcuts() {
    return {
      'Mod-l': ({ editor }) => editor.commands.toggleLinkModal()
    }
  },
});

export default LinkModal
import "@tiptap/react";

declare module "@tiptap/react" {
  interface Commands<ReturnType> {
    linkModal: {
      toggleLinkModal: () => ReturnType;
    };
  }
}
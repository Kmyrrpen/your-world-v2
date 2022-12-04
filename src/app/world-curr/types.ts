export type Note = Readonly<{
  name: string;
  description: string;
  content: string;
  id: string;
  tagIds: string[];
}>;

export type Tag = Readonly<{
  name: string;
  color: {
    background: string;
    text: string;
  };
  description: string;
  id: string;
}>;

export type TagsObject = { readonly [key: string]: Tag };
export type NotesObject = { readonly [key: string]: Note };

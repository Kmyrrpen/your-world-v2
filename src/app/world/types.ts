import { Writeable } from "@/utils";

export type Note = Readonly<{
  name: string;
  description: string;
  content: string;
  id: string;
  tagIds: string[];
}>;

export type Tag = Readonly<{
  name: string;
  color: string;
  description: string;
  id: string;
}>;

export type LoadState = "none" | "loading" | "loaded" | "error";

export type TagsObject = { readonly [key: string]: Tag };
export type NotesObject = { readonly [key: string]: Note };

export type WorldState = {
  name: string;
  id: string;
  notes: { [key: string]: Writeable<Note> };
  tags: { [key: string]: Writeable<Tag> };
  loadState: LoadState;
};
export type StoredWorldState = Omit<WorldState, "loadState">;

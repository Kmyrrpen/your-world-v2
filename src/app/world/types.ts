import { DBSchema } from 'idb';
import { Writeable } from '@/utils/types';

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
export type LoadState = 'none' | 'loading' | 'loaded' | 'error';

export type WorldState = {
  notes: { [key: string]: Writeable<Note> };
  tags: { [key: string]: Writeable<Tag> };
  loadState: LoadState;
  id: string;
};

export interface WorldSchema extends DBSchema {
  tags: {
    key: string;
    value: Tag;
  };
  notes: {
    key: string;
    value: Note;
  };
}

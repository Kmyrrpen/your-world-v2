import create from 'zustand';
import createStore from 'zustand/vanilla';
import { LoadState, Zaction } from '@/utils/types';
import { immer } from 'zustand/middleware/immer';
import { Note, Tag } from './types';
import { openWorldDB } from './db';
import { stateObjectToArray } from '@/utils';

interface State {
  notes: { [key: string]: Note };
  tags: { [key: string]: Tag };
  loadState: LoadState;
  id: string;
}

interface WorldStore extends State {
  setStore: Zaction<State>;
  setLoadState: Zaction<LoadState>;
  createNote: Zaction<Note, Promise<void>>;
  deleteNote: Zaction<Note, Promise<void>>;
  createTag: Zaction<Tag, Promise<void>>;
  deleteTag: Zaction<Tag, Promise<void>>;
}

/**
 * The recommended pattern for zustand is `create<T>()(...)`, instead
 * in here we do `create(immer<T>(...))`, because of a weird bug encountered
 * with unions. Although this solution comes with it's own batch of problems,
 * since we're only using immer anyways it should be fine
 */
export const worldStore = createStore(
  immer<WorldStore>((set, get) => ({
    notes: {},
    tags: {},
    id: '',
    loadState: 'none',
    setStore: (payload) => {
      set(payload);
    },
    setLoadState: (payload) => {
      set((state) => {
        state.loadState = payload;
      });
    },
    createNote: async (payload) => {
      const worldId = get().id;
      const db = await openWorldDB(worldId);
      await db.put('notes', payload);
      set((state) => {
        state.notes[payload.id] = payload;
      });
    },
    deleteNote: async (payload) => {
      const worldId = get().id;
      const db = await openWorldDB(worldId);
      await db.delete('notes', payload.id);
      set((state) => {
        delete state.notes[payload.id];
      });
    },
    createTag: async (payload) => {
      const worldId = get().id;
      const db = await openWorldDB(worldId);
      await db.put('tags', payload);
      set((state) => {
        state.tags[payload.id] = payload;
      });
    },
    deleteTag: async (payload) => {
      const { notes, id: worldId } = get();
      const db = await openWorldDB(worldId);
      const tr = await db.transaction(['notes', 'tags'], 'readwrite');

      // find all notes that have the tag and update them on the db.
      const notesTr = tr.objectStore('notes');
      const promises: Promise<string>[] = [];
      const newNotes: Note[] = stateObjectToArray(notes).reduce(
        (arr: Note[], note: Note) => {
          if (!note.tagIds.includes(payload.id)) return arr;
          const tagIds = note.tagIds.filter((tagId) => tagId !== payload.id);
          const newNote = { ...note, tagIds };
          arr.push(newNote);
          promises.push(notesTr.put(newNote));
          return arr;
        },
        [],
      );
      await Promise.all(promises);

      // if all promises above runs, delete the tag from db.
      const tagsTr = tr.objectStore('tags');
      await tagsTr.delete(payload.id);

      // then after all db transactions are finished, update our zustand store.
      set((state) => {
        delete state.tags[payload.id];
        newNotes.forEach((note) => {
          state.notes[note.id] = note;
        });
      });
    },
  })),
);

export const useWorldStore = create(worldStore);

import create from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { Action, Writeable } from '@/utils/types';
import { Note, NotesObject, Tag, TagsObject } from './types';
import { stateObjectToArray } from '@/utils';
import { closeWorldConnection, createWorldDB, getWorldConnection } from '../db';

interface State {
  notes: { [key: string]: Note };
  tags: { [key: string]: Tag };
  id: string;
}

interface WorldStore extends State {
  hydrateStore: Action<string, Promise<void>>;
  resetStore: Action<never, Promise<void>>;
  setNote: Action<Note, Promise<void>>;
  deleteNote: Action<Note, Promise<void>>;
  setTag: Action<Tag, Promise<void>>;
  deleteTag: Action<Tag, Promise<void>>;
}

/**
 * The recommended pattern for zustand is `create<T>()(...)`, instead
 * in here we do `create(immer<T>(...))`, because of a weird bug encountered
 * with unions. Although this solution comes with it's own batch of problems,
 * since we're only using immer anyways it should be fine
 */
export const useWorldStore = create(
  immer<WorldStore>((set, get) => ({
    notes: {},
    tags: {},
    id: '',
    hydrateStore: async (payload) => {
      const tr = (await createWorldDB(payload)).transaction(['tags', 'notes']);
      const notes: Writeable<NotesObject> = {};
      let noteCursor = await tr.objectStore('notes').openCursor();

      while (noteCursor) {
        const note = noteCursor.value;
        notes[note.id] = note;
        noteCursor = await noteCursor.continue();
      }

      const tags: Writeable<TagsObject> = {};
      let tagCursor = await tr.objectStore('tags').openCursor();
      while (tagCursor) {
        const tag = tagCursor.value;
        tags[tag.id] = tag;
        tagCursor = await tagCursor.continue();
      }

      set({ notes, tags, id: payload });
    },
    resetStore: async () => {
      set({
        id: '',
        notes: {},
        tags: {},
      });
      closeWorldConnection();
    },
    setNote: async (payload) => {
      const db = getWorldConnection();
      await db.put('notes', payload);
      set((state) => {
        state.notes[payload.id] = payload;
      });
    },
    deleteNote: async (payload) => {
      const db = getWorldConnection();
      await db.delete('notes', payload.id);
      set((state) => {
        delete state.notes[payload.id];
      });
    },
    setTag: async (payload) => {
      const db = getWorldConnection();
      await db.put('tags', payload);
      set((state) => {
        state.tags[payload.id] = payload;
      });
    },
    deleteTag: async (payload) => {
      const { notes } = get();
      const db = getWorldConnection();
      const tr = db.transaction(['notes', 'tags'], 'readwrite');

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

// const createWorldStore = async (id: string) => {
//   const connection = await createWorldDB(id);
//   const tr = connection.transaction(['notes', 'tags']);

//   const notes: Writeable<NotesObject> = {};
//   const tags: Writeable<TagsObject> = {};

//   let noteCursor = await tr.objectStore('notes').openCursor();
//   let tagCursor = await tr.objectStore('tags').openCursor();
//   while (noteCursor) {
//     const note = noteCursor.value;
//     notes[note.id] = note;
//     noteCursor = await noteCursor.continue();
//   }
//   while (tagCursor) {
//     const tag = tagCursor.value;
//     tags[tag.id] = tag;
//     tagCursor = await tagCursor.continue();
//   }

//   return createStore(
//     immer<WorldStore>((set, get) => ({
//       notes,
//       tags,
//       id,
//       resetStore: async () => {
//         set({
//           id: '',
//           notes: {},
//           tags: {},
//         });
//         connection.close();
//       },
//       setNote: async (payload) => {
//         const db = await getWorldConnection();
//         await db.put('notes', payload);
//         set((state) => {
//           state.notes[payload.id] = payload;
//         });
//       },
//       deleteNote: async (payload) => {
//         const db = await getWorldConnection();
//         await db.delete('notes', payload.id);
//         set((state) => {
//           delete state.notes[payload.id];
//         });
//       },
//       setTag: async (payload) => {
//         const db = await getWorldConnection();
//         await db.put('tags', payload);
//         set((state) => {
//           state.tags[payload.id] = payload;
//         });
//       },
//       deleteTag: async (payload) => {
//         const { notes } = get();
//         const db = await getWorldConnection();
//         const tr = await db.transaction(['notes', 'tags'], 'readwrite');

//         // find all notes that have the tag and update them on the db.
//         const notesTr = tr.objectStore('notes');
//         const promises: Promise<string>[] = [];
//         const newNotes: Note[] = stateObjectToArray(notes).reduce(
//           (arr: Note[], note: Note) => {
//             if (!note.tagIds.includes(payload.id)) return arr;
//             const tagIds = note.tagIds.filter((tagId) => tagId !== payload.id);
//             const newNote = { ...note, tagIds };
//             arr.push(newNote);
//             promises.push(notesTr.put(newNote));
//             return arr;
//           },
//           [],
//         );
//         await Promise.all(promises);

//         // if all promises above runs, delete the tag from db.
//         const tagsTr = tr.objectStore('tags');
//         await tagsTr.delete(payload.id);

//         // then after all db transactions are finished, update our zustand store.
//         set((state) => {
//           delete state.tags[payload.id];
//           newNotes.forEach((note) => {
//             state.notes[note.id] = note;
//           });
//         });
//       },
//     })),
//   );
// };

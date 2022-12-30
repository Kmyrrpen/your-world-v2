import { createStore } from "zustand";
import { immer } from "zustand/middleware/immer";

import { Action } from "@/utils/types";
import { createWorldDB } from "./db";
import { Note, Tag } from "./types";

interface State {
  notes: { [key: string]: Note };
  tags: { [key: string]: Tag };
  id: string;
}

export interface WorldStore extends State {
  close: Action<never>;
  setTag: Action<Tag, Promise<void>>;
  setNote: Action<Note, Promise<void>>;
  deleteTag: Action<Tag, Promise<void>>;
  deleteNote: Action<Note, Promise<void>>;
}

export const createWorldStore = async (id: string) => {
  const { connection, notes, tags } = await createWorldDB(id);
  return createStore(
    immer<WorldStore>((set, get) => ({
      id,
      tags,
      notes,
      close: () => {
        connection.close();
      },
      setNote: async (payload) => {
        await connection.put("notes", payload);
        set((state) => {
          state.notes[payload.id] = payload;
        });
      },
      deleteNote: async (payload) => {
        await connection.delete("notes", payload.id);
        set((state) => {
          delete state.notes[payload.id];
        });
      },
      setTag: async (payload) => {
        await connection.put("tags", payload);
        set((state) => {
          state.tags[payload.id] = payload;
        });
      },
      deleteTag: async (payload) => {
        const { notes } = get();
        const tr = connection.transaction(["notes", "tags"], "readwrite");

        // find all notes that have the tag and update them on the db.
        const notesTr = tr.objectStore("notes");
        const promises: Promise<string>[] = [];
        const newNotes: Note[] = Object.values(notes).reduce(
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
        const tagsTr = tr.objectStore("tags");
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
};

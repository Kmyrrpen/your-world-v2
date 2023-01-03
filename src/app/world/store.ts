import { createStore } from "zustand";
import { immer } from "zustand/middleware/immer";

import { Action, PostMessage } from "@/utils/types";
import { createWorldDB } from "./db";
import { Note, Tag } from "./types";

type State = {
  notes: { [key: string]: Note };
  tags: { [key: string]: Tag };
  id: string;
};

type WorldActions = {
  close: Action<never>;
  setTag: Action<Tag, Promise<void>>;
  setNote: Action<Note, Promise<void>>;
  deleteTag: Action<Tag, Promise<void>>;
  deleteNote: Action<Note, Promise<void>>;
};

export type WorldStore = State & WorldActions;

export const createWorldStore = async (id: string) => {
  const { connection, notes, tags } = await createWorldDB(id);
  const channel = new BroadcastChannel(`world: ${id}`);
  const postMessage = channel.postMessage.bind(
    channel,
  ) as PostMessage<WorldActions>;

  const store = createStore<WorldStore>()(
    immer((set, get) => ({
      id,
      tags,
      notes,
      close: () => {
        channel.close();
        connection.close();
      },
      setNote: async (payload, fromChannel) => {
        if (!fromChannel) {
          await connection.put("notes", payload);
          postMessage({ type: "setNote", payload });
        }
        set((state) => {
          state.notes[payload.id] = payload;
        });
      },
      deleteNote: async (payload, fromChannel) => {
        if (!fromChannel) {
          await connection.delete("notes", payload.id);
          postMessage({ type: "deleteNote", payload });
        }
        set((state) => {
          delete state.notes[payload.id];
        });
      },
      setTag: async (payload, fromChannel) => {
        if (!fromChannel) {
          await connection.put("tags", payload);
          postMessage({ type: "setTag", payload });
        }
        set((state) => {
          state.tags[payload.id] = payload;
        });
      },
      deleteTag: async (payload, fromChannel) => {
        const { notes } = get();

        const newNotes: Note[] = Object.values(notes).reduce(
          (arr: Note[], note: Note) => {
            if (!note.tagIds.includes(payload.id)) return arr;
            const tagIds = note.tagIds.filter((tagId) => tagId !== payload.id);
            const newNote = { ...note, tagIds };
            arr.push(newNote);
            return arr;
          },
          [],
        );

        if (!fromChannel) {
          const tr = connection.transaction(["notes", "tags"], "readwrite");
          const notesTr = tr.objectStore("notes");

          // place all promises to db.
          const promises: Promise<string>[] = newNotes.map((note) =>
            notesTr.put(note),
          );
          await Promise.all(promises);

          // if all promises above runs, delete the tag from db.
          const tagsTr = tr.objectStore("tags");
          await tagsTr.delete(payload.id);
        }

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

  const isMessagePayload = (
    data: any,
  ): data is { type: keyof WorldActions; payload: any } => {
    const state = store.getState();
    const keys = Object.keys(state);
    return (
      Object.hasOwn(data, "type") &&
      Object.hasOwn(data, "payload") &&
      keys.includes(data.type) &&
      typeof state[data.type as keyof WorldActions] === "function"
    );
  };

  channel.onmessage = (event) => {
    const { data } = event;
    console.log(data);
    if (isMessagePayload(data)) {
      store.getState()[data.type](data.payload, true);
    }
  };

  return store;
};

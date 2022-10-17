import { get } from "idb-keyval";
import { proxy } from "valtio";
import { createReducer, Action, createAction } from "wuuber";
import { notesToArray } from "@/utils";
import { LoadState, Note, StoredWorldState, Tag, WorldState } from "./types";

// Responsible for current world
export const worldStore = proxy<WorldState>({
  name: "",
  notes: {},
  tags: {},
  loadState: "none",
  id: "",
});

// root actions
export const worldReducer = createReducer("world", {
  createNote: (action: Action<Note>) => {
    const note = action.payload;
    worldStore.notes[note.id] = note;
  },
  deleteNote: (action: Action<Note>) => {
    const note = action.payload;
    delete worldStore.notes[note.id];
  },
  createTag: (action: Action<Tag>) => {
    const tag = action.payload;
    worldStore.tags[tag.id] = tag;
  },
  removeTag: (action: Action<{ note: Note; tag: string }>) => {
    const { note, tag: tagIdToRemove } = action.payload;
    const mutableNote = worldStore.notes[note.id];
    mutableNote.tagIds = mutableNote.tagIds.filter(
      (tagId) => tagId !== tagIdToRemove
    );
  },
  setLoadState: (action: Action<LoadState>) => {
    worldStore.loadState = action.payload;
  },
  _deleteTag: (action: Action<string>) => {
    const tagId = action.payload;
    delete worldStore.tags[tagId];
  },
  _initializeWorld: (action: Action<WorldState>) => {
    worldStore.notes = { ...action.payload.notes };
    worldStore.tags = { ...action.payload.tags };
    worldStore.loadState = action.payload.loadState;
    worldStore.id = action.payload.id;
  },
});

const {
  createNote,
  createTag,
  deleteNote,
  removeTag,
  setLoadState,
  _deleteTag,
  _initializeWorld,
} = worldReducer.actions;

const deleteTag = createAction<string>(
  "world/deleteTag",
  (action, _, dispatch) => {
    const tagIdToRemove = action.payload;

    // remove references of the tag from every note
    notesToArray(worldStore.notes).forEach((note) => {
      if (note.tagIds.findIndex((tagId) => tagId === tagIdToRemove) !== -1) {
        dispatch(removeTag({ note, tag: tagIdToRemove }));
      }
    });

    // then delete the tag from the store
    dispatch(_deleteTag(tagIdToRemove));
  }
);

const initializeWorld = createAction<string>(
  "world/initializeWorld",
  async (action, _, dispatch) => {
    dispatch(setLoadState("loading"));

    const world: StoredWorldState | undefined = await get(action.payload);
    if (!world) return dispatch(setLoadState("error"));

    dispatch(_initializeWorld({ ...world, loadState: "loaded" }));
  }
);

const unmountWorld = createAction(
  "world/unmountWorld",
  async (action, _, dispatch) => {
    dispatch(
      _initializeWorld({
        name: "",
        id: "",
        loadState: "none",
        notes: {},
        tags: {},
      })
    );
  }
);

// expose non-internal action creators
export {
  createNote,
  createTag,
  deleteNote,
  deleteTag,
  initializeWorld,
  unmountWorld,
};

export const worldFlows = [
  worldReducer,
  // non-reducer actions
  deleteTag,
  initializeWorld,
  unmountWorld,
];

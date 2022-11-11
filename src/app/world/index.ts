import { createReducer, Action, Flow, createAction } from 'wuuber';
import { proxy } from 'valtio';
import { nanoid } from 'nanoid';
import { changeRoute } from '@/hooks/useEnableChangeRoute';
import { createMeta, metaStore } from '../metas';
import { openWorldDB } from './utils';
import { connections } from '../connections';

import {
  LoadState,
  Note,
  NotesObject,
  Tag,
  TagsObject,
  WorldState,
} from './types';
import { stateObjectToArray } from '@/utils';
import { Writeable } from '@/utils/types';

export const worldStore = proxy<WorldState>({
  notes: {},
  tags: {},
  id: '',
  loadState: 'none',
});

export const worldLoadedActions = createReducer('world_loaded', {
  createNote: (action: Action<Note | Note[]>) => {
    if (Array.isArray(action.payload)) {
      action.payload.forEach((note) => (worldStore.notes[note.id] = note));
    } else worldStore.notes[action.payload.id] = action.payload;
  },
  deleteNote: (action: Action<Note>) => {
    const note = action.payload;
    delete worldStore.notes[note.id];
  },
  createTag: (action: Action<Tag>) => {
    const tag = action.payload;
    worldStore.tags[tag.id] = tag;
  },
  deleteTag: (action: Action<string>) => {
    const tagId = action.payload;
    delete worldStore.tags[tagId];
  },
});

export const { createNote, deleteNote, createTag, deleteTag } =
  worldLoadedActions.actions;

const worldSetActions = createReducer('world_set', {
  setWorld: (action: Action<WorldState>) => {
    const newWorld = action.payload;
    const keys = Object.keys(newWorld) as (keyof typeof newWorld)[];
    // @ts-ignore: idk how to tell typescript that using the same key will reference the same type
    keys.forEach((key) => (worldStore[key] = newWorld[key]));
  },
  setWorldLoad: (action: Action<LoadState>) => {
    worldStore.loadState = action.payload;
  },
});

export const { setWorld, setWorldLoad } = worldSetActions.actions;

/**
 * Listen to actions that will transform data inside world,
 * do the same in the DB first and then let it through
 */
export const saveToDBFlow: Flow = async (action, { next, dispatch }) => {
  const { world: db } = connections;

  // if db is not connected, check if action is one of the reducer actions,
  // if it is, log an error else just pass the action along.
  if (!db) {
    if (action.type.startsWith('world_loaded')) {
      console.group();
      console.error(
        'WORLD: reducer actions are being called without db connection.',
      );
      console.error(`action dispatched: ${action.type}`);
      return;
    } else return next(action);
  }

  // Note: create/update
  if (createNote.match(action)) {
    const tr = db.transaction('notes', 'readwrite');
    if (Array.isArray(action.payload)) {
      const promises = action.payload.map((note) => tr.store.put(note));
      await Promise.all(promises);
    } else await tr.store.put(action.payload);
  }

  // Note: delete
  else if (deleteNote.match(action)) {
    const tr = db.transaction('notes', 'readwrite');
    await tr.store.delete(action.payload.id);
  }

  // Tag: create/update
  else if (createTag.match(action)) {
    const tr = db.transaction('tags', 'readwrite');
    const promise = tr.store.put(action.payload);

    // editor needs to also wait for the promise,
    // attach the next(action) which is just createTag and
    // return the promise.
    promise.then(() => next(action));
    return promise;
  }

  // Tag: delete
  else if (deleteTag.match(action)) {
    const tr = db.transaction('tags', 'readwrite');
    const tagId = action.payload;
    const moddedNotes = stateObjectToArray(worldStore.notes).map((note) => {
      return { ...note, tagIds: note.tagIds.filter((id) => id !== tagId) };
    });

    tr.store.delete(action.payload);
    dispatch(createNote(moddedNotes));
  }

  return next(action);
};

/**
 * Call when opening a world to load all the data needed
 * as well as providing a connection to the db.
 */
export const openWorld = createAction<string>(
  'world/openWorld',
  async (action, { dispatch }) => {
    // tell app world is being loaded.
    dispatch(setWorldLoad('loading'));

    if (!connections.world) {
      // world doesn't really exist
      if (!metaStore.metas[action.payload]) {
        return dispatch(setWorldLoad('error'));
      }
      const worldDB = await openWorldDB(action.payload);
      connections.world = worldDB;
    }

    const db = connections.world;
    const tr = db.transaction(['tags', 'notes']);

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

    // grab all necessary data and upload it to app
    dispatch(
      setWorld({
        notes,
        tags,
        id: action.payload,
        loadState: 'loaded',
      }),
    );
  },
);

/**
 * closes the world db, reset the world state
 */
export const closeWorld = createAction(
  'world/close',
  (action, { dispatch }) => {
    if (!connections.world) {
      console.error('WORLD: closeWorld called without db connection');
    } else {
      connections.world.close();
      connections.world = null;
    }

    // should still dispatch a reset in the case that the world doesn't exist
    dispatch(
      setWorld({
        loadState: 'none',
        id: '',
        notes: {},
        tags: {},
      }),
    );
  },
);

/**
 * on world create, create a new DB with world id and also dispatch createMeta to store meta
 * on metas db.
 */
export const createWorld = createAction<string>(
  'world/create',
  async (action, { dispatch }) => {
    // create the db and store it in connections
    const name = action.payload;
    const id = nanoid();
    const worldDB = await openWorldDB(id);

    connections.world = worldDB;
    await dispatch(createMeta({ id, name }));
    changeRoute(id);
  },
);

export const worldFlows = [
  createWorld,
  openWorld,
  closeWorld,
  worldSetActions,
  saveToDBFlow,
  worldLoadedActions,
];

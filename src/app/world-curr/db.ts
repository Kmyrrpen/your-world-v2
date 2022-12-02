import { connections } from '../connections';
import { worldStore } from '.';
import { metaStore } from '../world-metas';
import { openDB } from 'idb';
import { NotesObject, TagsObject, WorldSchema } from './types';
import { Writeable } from '@/utils/types';

/**
 * opens a connection to a world database, then hydrates
 * `worldStore`, throws when world doesn't have a meta and create is set to false
 */
export const openWorldDB = async (id: string, create = false) => {
  if (connections.world) return connections.world;
  const store = worldStore.getState();
  store.setLoadState('loading');

  if (!metaStore.getState().metas[id] && !create) {
    store.setLoadState('error');
    throw new Error("World being opened doesn't exist");
  }

  const worldDB = await openDB<WorldSchema>(id, 1, {
    upgrade: (db) => {
      db.createObjectStore('notes', { keyPath: 'id' });
      db.createObjectStore('tags', { keyPath: 'id' });
    },
  });

  connections.world = worldDB;
  const tr = worldDB.transaction(['tags', 'notes']);

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

  store.setStore({
    notes,
    tags,
    id,
    loadState: 'loaded',
  });

  return worldDB;
};

/**
 * Closes **current** world database connection, throws an error
 * when connection didn't exist prior to calling `closeWorld`.
 */
export const closeWorldDB = async () => {
  if (!connections.world) {
    console.error('WORLD: closeWorld called without db connection');
    throw new Error('WORLD: closeWorld called without db connection');
  }
  const store = worldStore.getState();
  connections.world.close();
  connections.world = null;

  store.setStore({
    loadState: 'none',
    id: '',
    notes: {},
    tags: {},
  });
};

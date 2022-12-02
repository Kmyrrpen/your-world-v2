import { Writeable } from '@/utils/types';
import { openDB } from 'idb';
import { metaStore } from '.';
import { connections } from '../connections';
import { MetaSchema, WorldMetasObject } from './types';

/**
 * Opens a connection to meta database, grab user data, and hydrate
 * the `metaStore`.
 */
export const openMetaDB = async () => {
  if (connections.metas) return connections.metas;
  const store = metaStore.getState();
  store.setLoadState('loading');

  // grab saved user data
  const metasDB = await openDB<MetaSchema>('metas', 1, {
    upgrade: (db) => {
      db.createObjectStore('metas', { keyPath: 'id' });
    },
  });
  connections.metas = metasDB;
  const tr = metasDB.transaction('metas', 'readonly');
  const metas = await tr.store.getAll();

  // then hydrate meta store
  store.setStore({
    metas: metas.reduce((obj: Writeable<WorldMetasObject>, meta) => {
      obj[meta.id] = meta;
      return obj;
    }, {}),
    loadState: 'loaded',
  });

  return metasDB;
};

/**
 * Close connection to Meta Database
 */
export const closeMetaDB = async () => {
  if (!connections.metas) {
    console.error('METAS: closeMeta called without db connection');
    return;
  }

  const store = metaStore.getState();
  connections.metas.close();
  connections.metas = null;
  store.setStore({
    metas: {},
    loadState: 'none',
  });
};

/**
 * Deletes world, be sure that the world is currently not open.
 * If ever we use the broadcast API, we'll probably have to account for world deletions.
 */
export const deleteWorld = async (id: string) => {
  if (!connections.metas) {
    console.error('METAS: deleteWorldMeta called without db connection');
    return;
  }

  await connections.metas.delete('metas', id);
};

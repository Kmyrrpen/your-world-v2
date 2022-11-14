import { IDBPDatabase, openDB } from 'idb';
import { WorldSchema } from './types';

export const openWorldDB = async (
  id: string,
): Promise<IDBPDatabase<WorldSchema>> => {
  const worldDB = await openDB<WorldSchema>(id, 1, {
    upgrade: (db) => {
      db.createObjectStore('notes', { keyPath: 'id' });
      db.createObjectStore('tags', { keyPath: 'id' });
    },
  });

  return worldDB;
};

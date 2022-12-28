import { openDB } from 'idb';
import { WorldSchema } from './types';

export const createWorldDB = async (id: string) => {
  const worldDB = await openDB<WorldSchema>(id, 1, {
    upgrade: (db) => {
      console.log('upgrade event called');
      db.createObjectStore('notes', { keyPath: 'id' });
      db.createObjectStore('tags', { keyPath: 'id' });
    },
  });
  return worldDB;
};

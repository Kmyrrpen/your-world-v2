import { deleteDB, IDBPDatabase, openDB } from 'idb';
import { WorldSchema } from './types';

let connection: IDBPDatabase<WorldSchema> | null = null;

/**
 * creates/opens worldDB given an id, then sets current connection
 * to it.
 */
export const openWorldDB = async (id: string) => {
  const worldDB = await openDB<WorldSchema>(id, 1, {
    upgrade: (db) => {
      db.createObjectStore('notes', { keyPath: 'id' });
      db.createObjectStore('tags', { keyPath: 'id' });
    },
  });
  connection = worldDB;
  return connection;
};

/**
 * Gets the **current** worldDB connection made, throws if none exists.
 */
export const getWorldDB = async () => {
  if (!connection)
    throw new Error(
      'getWorldDB called without DB connection being established',
    );
  return connection;
};

/**
 * Closes **current** world database connection, throws an error
 * if no prior connection was made.
 */
export const closeWorldDB = async () => {
  if (!connection) {
    throw new Error('WORLD: closeWorld called without db connection');
  }
  connection.close();
  connection = null;
};

/**
 * Deletes world database, throws an error
 * if no prior connection was made.
 */
export const deleteWorldDB = async (id: string) => {
  if (!connection) {
    throw new Error('deleteWorldDB was called without db connection');
  }
  connection.close();
  connection = null;
  await deleteDB(id);
};

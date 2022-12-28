import { deleteDB, IDBPDatabase, openDB } from 'idb';
import { WorldSchema } from './types';

export let connection: IDBPDatabase<WorldSchema> | null = null;

/**
 * creates/opens worldDB given an id, then sets current connection
 * to it.
 */
export const createWorldDB = async (id: string) => {
  const worldDB = await openDB<WorldSchema>(id, 1, {
    upgrade: (db) => {
      db.createObjectStore('notes', { keyPath: 'id' });
      db.createObjectStore('tags', { keyPath: 'id' });
    },
    blocking: async (curr, blocked) => {
      // // close DB connection in response to deletion
      // if (blocked === null) {
      //   console.log('DB connection forced to close');
      //   worldDB.close();
      // }
    },
  });
  connection = worldDB;
  return connection;
};

/**
 * deletes specific worldDB, note that this does not check whether or not
 * an id is an existing worldDB or if it is even a worldDB. this was written
 * purely for uniformity.
 */

export const deleteWorldDB = async (
  id: string,
  onBlocked: (currentVersion: number, event: IDBVersionChangeEvent) => void,
): Promise<void> => {
  await deleteDB(id, { blocked: onBlocked });
};

/**
 * Gets the **current** worldDB connection, throws if none exists.
 */
export const getWorldConnection = () => {
  if (!connection)
    throw new Error(
      'getWorldDB called without DB connection being established',
    );
  return connection;
};

/**
 * Closes **current** worldDB connection, throws if none exists.
 */
export const closeWorldConnection = () => {
  if (!connection) {
    throw new Error('WORLD: closeWorld called without db connection');
  }
  connection.close();
  connection = null;
};

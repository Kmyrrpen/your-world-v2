import { IDBPDatabase, openDB } from 'idb';
import { MetaSchema } from './types';

let connection: IDBPDatabase<MetaSchema> | null = null;

/**
 * opens/creates a connection to metaDB.
 */
export const openMetaDB = async () => {
  const metasDB = await openDB<MetaSchema>('metas', 1, {
    upgrade: (db) => {
      db.createObjectStore('metas', { keyPath: 'id' });
    },
  });
  connection = metasDB;
  return connection;
};

/**
 * Gets connection to metaDB, throws if none exists.
 */
export const getMetaDB = async () => {
  if (!connection)
    throw new Error('getMetaDB called without prior connection.');
  return connection;
};

/**
 * Close connection to Meta Database
 */
export const closeMetaDB = async () => {
  if (!connection) throw new Error("connection to metaDB doesn't exist.");
  connection.close();
  connection = null;
};

import { IDBPDatabase, openDB } from 'idb';
import { MetaSchema } from './types';

let connection: IDBPDatabase<MetaSchema> | null = null;

/**
 * opens/creates metaDB and sets connection to it.
 */
export const createMetaDB = async () => {
  const metasDB = await openDB<MetaSchema>('metas', 1, {
    upgrade: (db) => {
      db.createObjectStore('metas', { keyPath: 'id' });
    },
  });
  connection = metasDB;
  return connection;
};

/**
 * Close metaDB connection, throws if none exists.
 */
export const closeMetaConnection = async () => {
  if (!connection) throw new Error("connection to metaDB doesn't exist.");
  connection.close();
  connection = null;
};

/**
 * Gets metaDB connection, throws if none exists.
 */
export const getMetaConnection = async () => {
  if (!connection)
    throw new Error('getMetaDB called without prior connection.');
  return connection;
};

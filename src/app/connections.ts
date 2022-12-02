import { IDBPDatabase } from 'idb';
import { WorldSchema } from './world-curr/types';
import { MetaSchema } from './world-metas/types';

export type Connections = {
  world: null | IDBPDatabase<WorldSchema>;
  metas: null | IDBPDatabase<MetaSchema>;
};

export const connections: Connections = {
  world: null,
  metas: null,
};

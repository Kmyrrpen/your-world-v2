import { IDBPDatabase } from 'idb';
import { MetasSchema } from './metas/types';
import { WorldSchema } from './world/types';

export type Connections = {
  world: null | IDBPDatabase<WorldSchema>;
  metas: null | IDBPDatabase<MetasSchema>;
};

export const connections: Connections = {
  world: null,
  metas: null,
};

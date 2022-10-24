import { DBSchema } from 'idb';

export type WorldMetasObject = { readonly [key: string]: WorldMeta };
export type WorldMeta = Readonly<{
  name: string;
  id: string;
}>;

export interface MetasSchema extends DBSchema {
  metas: {
    key: string;
    value: WorldMeta;
  };
}

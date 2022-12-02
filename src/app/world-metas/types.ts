import { DBSchema } from 'idb';

export type WorldMeta = {
  readonly name: string;
  readonly id: string;
};

export type WorldMetasObject = { readonly [key: string]: WorldMeta };

export interface MetaSchema extends DBSchema {
  metas: {
    key: string;
    value: WorldMeta;
  };
}

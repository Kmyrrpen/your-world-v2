import { DBSchema } from "idb";

export type Meta = {
  readonly name: string;
  readonly id: string;
};

export type Metas = { readonly [key: string]: Meta };

export interface MetaSchema extends DBSchema {
  metas: {
    key: string;
    value: Meta;
  };
}

import create from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { Action, Writeable } from '@/utils/types';
import { WorldMeta, WorldMetasObject } from './types';
import { closeMetaConnection, createMetaDB, getMetaConnection } from '../db';

interface State {
  metas: WorldMetasObject;
}

interface WorldMetaStore extends State {
  /** fetches metas from idb and hydrates the store */
  hydrateStore: Action<never, Promise<void>>;
  /** removes current state from store */
  resetStore: Action<never, Promise<void>>;
  /** sets meta object to payload */
  setMeta: Action<WorldMeta, Promise<void>>;
  /** deletes meta object */
  deleteMeta: Action<WorldMeta, Promise<void>>;
}

/**
 * The recommended pattern for zustand is `create<T>()(...)`, instead
 * in here we do `create(immer<T>(...))`, because of a weird bug encountered
 * with unions. Although this solution comes with it's own batch of problems,
 * since we're only using immer anyways it should be fine
 */
export const useMetaStore = create(
  immer<WorldMetaStore>((set) => ({
    metas: {},
    hydrateStore: async () => {
      const metas = await (await createMetaDB()).getAll('metas');
      set({
        metas: metas.reduce(
          (obj: Writeable<WorldMetasObject>, meta: WorldMeta) => {
            obj[meta.id] = meta;
            return obj;
          },
          {},
        ),
      });
    },
    resetStore: async () => {
      await closeMetaConnection();
      set({ metas: {} });
    },
    setMeta: async (payload) => {
      const db = await getMetaConnection();
      await db.put('metas', payload);
      set((state) => {
        state.metas[payload.id] = payload;
      });
    },
    deleteMeta: async (payload) => {
      const db = await getMetaConnection();
      await db.delete('metas', payload.id);
      set((state) => {
        delete state.metas[payload.id];
      });
    },
  })),
);

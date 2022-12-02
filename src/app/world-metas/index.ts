import create from 'zustand';
import createStore from 'zustand/vanilla';
import { immer } from 'zustand/middleware/immer';
import { LoadState, Zaction } from '@/utils/types';
import { WorldMeta, WorldMetasObject } from './types';
import { openMetaDB } from './db';

interface State {
  metas: WorldMetasObject;
  loadState: LoadState;
}

interface WorldMetaStore extends State {
  setStore: Zaction<State>;
  setLoadState: Zaction<LoadState>;
  createMeta: Zaction<WorldMeta, Promise<void>>;
  deleteMeta: Zaction<WorldMeta, Promise<void>>;
}

/**
 * The recommended pattern for zustand is `create<T>()(...)`, instead
 * in here we do `create(immer<T>(...))`, because of a weird bug encountered
 * with unions. Although this solution comes with it's own batch of problems,
 * since we're only using immer anyways it should be fine
 */
export const metaStore = createStore(
  immer<WorldMetaStore>((set) => ({
    metas: {},
    loadState: 'none',
    setStore: (payload) => {
      set(payload);
    },
    setLoadState: (payload) => {
      set((state) => {
        state.loadState = payload;
      });
    },
    createMeta: async (payload) => {
      const db = await openMetaDB();
      await db.put('metas', payload);
      set((state) => {
        state.metas[payload.id] = payload;
      });
    },
    deleteMeta: async (payload) => {
      const db = await openMetaDB();
      await db.delete('metas', payload.id);
      set((state) => {
        delete state.metas[payload.id];
      });
    },
  })),
);

export const useMetaStore = create(metaStore);

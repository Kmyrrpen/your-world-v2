import create, { createStore, StoreApi } from "zustand";
import { immer } from "zustand/middleware/immer";
import { Action, Loading } from "@/utils/types";
import { Meta, Metas } from "./types";
import { createMetaDB } from "./db";
import { nanoid } from "nanoid";

export type MetaStore = {
  metas: Metas;
  close: Action<never>;
  setMeta: Action<Meta, Promise<void>>;
  deleteMeta: Action<string, Promise<void>>;
};

type MetaConnection = {
  loading: Loading;
  store: StoreApi<MetaStore> | null;
  validKey: string | null;
  connect: Action;
  disconnect: Action;
};

export const useMetaConnection = create<MetaConnection>()((set, get) => ({
  store: null,
  loading: "idle",
  validKey: null,
  connect: async () => {
    const key = nanoid();
    set({ validKey: key, loading: "loading" });
    try {
      const store = await createMetaStore();
      if (key === get().validKey) set({ store, loading: "loaded" });
    } catch {
      if (key === get().validKey) set({ store: null, loading: "error" });
    }
  },
  disconnect: () => {
    const store = get().store;
    if (store) store.getState().close();
    set({ store: null, validKey: null, loading: "idle" });
  },
}));

const createMetaStore = async () => {
  const { connection, metas } = await createMetaDB();
  return createStore(
    immer<MetaStore>((set) => ({
      metas: metas,
      close: () => {
        connection.close();
      },
      setMeta: async (payload) => {
        await connection.put("metas", payload);
        set((state) => {
          state.metas[payload.id] = payload;
        });
      },
      deleteMeta: async (payload) => {
        await connection.delete("metas", payload);
        set((state) => {
          delete state.metas[payload];
        });
      },
    })),
  );
};

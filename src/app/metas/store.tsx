import create, { createStore, StoreApi } from "zustand";
import { immer } from "zustand/middleware/immer";
import { Action, Loading, PostMessage } from "@/utils/types";
import { Meta, Metas } from "./types";
import { createMetaDB } from "./db";
import { nanoid } from "nanoid";

type MetaActions = {
  setMeta: Action<Meta, Promise<void>>;
  deleteMeta: Action<string, Promise<void>>;
  closeConnection: Action<never>;
};

export type MetaStore = {
  metas: Metas;
} & MetaActions;

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
    if (store) store.getState().closeConnection();
    set({ store: null, validKey: null, loading: "idle" });
  },
}));

const createMetaStore = async () => {
  const { connection, metas } = await createMetaDB();
  const channel = new BroadcastChannel("metas");
  const postMessage = channel.postMessage.bind(
    channel,
  ) as PostMessage<MetaActions>;

  const store = createStore(
    immer<MetaStore>((set) => ({
      metas: metas,
      closeConnection: () => {
        connection.close();
      },
      setMeta: async (payload, fromChannel) => {
        if (!fromChannel) {
          await connection.put("metas", payload);
          postMessage({ type: "setMeta", payload });
        }

        set((state) => {
          state.metas[payload.id] = payload;
        });
      },
      deleteMeta: async (payload, fromChannel) => {
        if (!fromChannel) {
          await connection.delete("metas", payload);
          postMessage({ type: "deleteMeta", payload });
        }

        set((state) => {
          delete state.metas[payload];
        });
      },
    })),
  );

  const isMessagePayload = (
    data: any,
  ): data is { type: keyof MetaActions; payload: any } => {
    const state = store.getState();
    const keys = Object.keys(state);
    return (
      Object.hasOwn(data, "type") &&
      Object.hasOwn(data, "payload") &&
      keys.includes(data.type) &&
      typeof state[data.type as keyof MetaActions] === "function"
    );
  };

  channel.onmessage = (event) => {
    const { data } = event;
    if (isMessagePayload(data)) {
      store.getState()[data.type](data.payload, true);
    }
  };

  return store;
};

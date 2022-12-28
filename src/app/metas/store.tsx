import create from "zustand";
import { immer } from "zustand/middleware/immer";
import { Action } from "@/utils/types";
import { Meta, Metas } from "./types";
import { createMetaDB } from "./db";

interface State {
  metas: Metas;
}

export interface MetaStore extends State {
  close: Action<never>;
  /** sets meta object to payload */
  setMeta: Action<Meta, Promise<void>>;
  /** deletes meta object */
  deleteMeta: Action<Meta, Promise<void>>;
}

export const createMetaStore = async () => {
  const { connection, metas } = await createMetaDB();
  return create(
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
        await connection.delete("metas", payload.id);
        set((state) => {
          delete state.metas[payload.id];
        });
      },
    })),
  );
};

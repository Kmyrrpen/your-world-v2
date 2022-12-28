import { Writeable } from "@/utils/types";
import { openDB } from "idb";
import { Meta, Metas, MetaSchema } from "./types";

export const createMetaDB = async () => {
  const metasDB = await openDB<MetaSchema>("metas", 1, {
    upgrade: (db) => {
      db.createObjectStore("metas", { keyPath: "id" });
    },
  });
  const metas = (await metasDB.getAll("metas")).reduce(
    (obj: Writeable<Metas>, meta: Meta) => {
      obj[meta.id] = meta;
      return obj;
    },
    {},
  );

  return { connection: metasDB, metas };
};

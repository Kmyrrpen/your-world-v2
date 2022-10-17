import { proxy, snapshot, subscribe } from "valtio";
import { nanoid } from "nanoid";
import { set, update, del, get } from "idb-keyval";
import { Action, createAction, createReducer } from "wuuber";
import { changeRoute } from "@/hooks/useEnableChangeRoute";
import { Writeable } from "@/utils";

import { unmountWorld } from "../world";
import { StoredWorldState } from "../world/types";
import { WorldMeta } from "./types";

interface WorldMetas {
  metas: readonly WorldMeta[];
}

const worldMetasKey = "worldList";
export const worldMetas = proxy<Writeable<WorldMetas>>({
  metas: [],
});

subscribe(worldMetas, () => {
  console.log(worldMetas.metas);
});

get(worldMetasKey).then((val) => {
  worldMetas.metas = val || [];
});

const worldMetasReducer = createReducer("worldMetas", {
  _update: (action: Action<WorldMeta[]>) => {
    worldMetas.metas = action.payload;
  },
});

const { _update } = worldMetasReducer.actions;

export const updateMetas = createAction<WorldMeta>(
  "worldMetas/updateWorldMeta",
  async (action, _, dispatch) => {
    const newWorldMetas = worldMetas.metas.map((meta) =>
      meta.id === action.payload.id ? action.payload : meta
    );

    await update<Readonly<WorldMeta[]>>(worldMetasKey, () => newWorldMetas);
    dispatch(_update(newWorldMetas));
  }
);

export const deleteWorld = createAction<string>(
  "worldMetas/deleteWorld",
  async (action, _, dispatch) => {
    const newWorldMetas = worldMetas.metas.filter(
      (meta) => meta.id !== action.payload
    );

    await update<WorldMeta[]>(worldMetasKey, () => newWorldMetas);
    await del(action.payload);
    dispatch(unmountWorld());
    dispatch(_update(newWorldMetas));

    changeRoute("/");
  }
);

export const createNewWorld = createAction<string>(
  "worldMetas/createNewWorld",
  async (action, _, dispatch) => {
    const worldId = nanoid();

    const worldMeta: WorldMeta = {
      name: action.payload,
      id: worldId,
    };

    const storedState: StoredWorldState = {
      name: action.payload,
      notes: {},
      tags: {},
      id: worldId,
    };
    const snap = snapshot(worldMetas.metas);

    const newWorldMetas = [worldMeta, ...snap];
    await update<WorldMeta[]>(worldMetasKey, () => newWorldMetas);
    await set(worldId, storedState);

    dispatch(_update(newWorldMetas));
    changeRoute(worldId);
  }
);

export const worldMetasFlows = [
  worldMetasReducer,
  createNewWorld,
  updateMetas,
  deleteWorld,
];

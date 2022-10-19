import { proxy, snapshot } from "valtio";
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

const worldListKey = "worldList";
export const worldList = proxy<Writeable<WorldMetas>>({
  metas: [],
});

get(worldListKey).then((val) => {
  worldList.metas = val || [];
});

const worldListReducer = createReducer("worldMetas", {
  _update: (action: Action<WorldMeta[]>) => {
    worldList.metas = action.payload;
  },
});

const { _update } = worldListReducer.actions;

export const updateMetas = createAction<WorldMeta>(
  "worldMetas/updateWorldMeta",
  async (action, _, dispatch) => {
    const newWorldMetas = worldList.metas.map((meta) =>
      meta.id === action.payload.id ? action.payload : meta
    );

    await update<Readonly<WorldMeta[]>>(worldListKey, () => newWorldMetas);
    dispatch(_update(newWorldMetas));
  }
);

export const deleteWorld = createAction<string>(
  "worldMetas/deleteWorld",
  async (action, _, dispatch) => {
    const newWorldMetas = worldList.metas.filter(
      (meta) => meta.id !== action.payload
    );

    await update<WorldMeta[]>(worldListKey, () => newWorldMetas);
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

    // create snap since idb will complain
    const snap = snapshot(worldList.metas);
    const newWorldMetas = [worldMeta, ...snap];
    await update<WorldMeta[]>(worldListKey, () => newWorldMetas);
    await set(worldId, storedState);

    dispatch(_update(newWorldMetas));
    changeRoute(worldId);
  }
);

export const worldListFlows = [
  worldListReducer,
  createNewWorld,
  updateMetas,
  deleteWorld,
];

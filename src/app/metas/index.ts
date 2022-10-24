import { Action, createAction, createReducer, Flow } from 'wuuber';
import { proxy } from 'valtio';
import { openDB } from 'idb';
import { Writeable } from '@/utils';
import { MetasSchema, WorldMeta, WorldMetasObject } from './types';
import { connections } from '../connections';
import { LoadState } from '../world/types';

type WorldMetas = { metas: Writeable<WorldMetasObject>; loadState: LoadState };
export const metaStore = proxy<WorldMetas>({ metas: {}, loadState: 'none' });

const metasLoadedActions = createReducer('metas_loaded', {
  createMeta: (action: Action<WorldMeta>) => {
    const meta = action.payload;
    metaStore.metas[meta.id] = meta;
  },
  deleteMeta: (action: Action<string>) => {
    delete metaStore.metas[action.payload];
  },
});

const metasSetActions = createReducer('metas_set', {
  setMetas: (action: Action<WorldMetas>) => {
    metaStore.metas = action.payload.metas;
    metaStore.loadState = action.payload.loadState;
  },
  setMetasLoad: (action: Action<LoadState>) => {
    metaStore.loadState = action.payload;
  },
});

export const { createMeta, deleteMeta } = metasLoadedActions.actions;
export const { setMetas, setMetasLoad } = metasSetActions.actions;

/**
 * Listen to actions that will transform data inside metas,
 * do the same in the DB first and then let it through
 */
export const saveToDBFlow: Flow = async (action, { next }) => {
  const { metas: metasDB } = connections;

  // if db is not connected, check if action is one of the reducer actions,
  // if it is, log an error else just pass the action along.
  if (!metasDB) {
    if (action.type.startsWith('metas_loaded')) {
      console.error(
        'METAS: reducer actions are being called without db connection.',
      );
      return;
    } else return next(action);
  }

  // Meta: create/update
  if (createMeta.match(action)) {
    const tr = metasDB.transaction('metas', 'readwrite');
    await tr.store.put(action.payload);
  }

  // Meta: delete
  else if (deleteMeta.match(action)) {
    const tr = metasDB.transaction('metas', 'readwrite');
    await tr.store.delete(action.payload);
  }

  return next(action);
};

/**
 * Should be called on app initialization, opens a connection to the DB
 * and fills metaStore with data.
 */
export const openMetas = createAction(
  'metas/openMetas',
  async (action, { dispatch }) => {
    // tell app metas needs time
    dispatch(setMetasLoad('loading'));

    const db = await openDB<MetasSchema>('metas', 1, {
      upgrade: (db, oldv, newv, tr) => {
        db.createObjectStore('metas', { keyPath: 'id' });
      },
    });

    connections.metas = db;
    const tr = db.transaction('metas', 'readonly');
    const metas = await tr.store.getAll();
    const metasObject: Writeable<WorldMetasObject> = {};
    metas.forEach((meta) => (metasObject[meta.id] = meta));

    dispatch(
      setMetas({
        metas: metasObject,
        loadState: 'loaded',
      }),
    );
  },
);

export const closeMetas = createAction(
  'metas/closeMetas',
  (action, { dispatch }) => {
    if (!connections.metas) {
      console.error('METAS: closeMeta called without db connection');
      return;
    }
    connections.metas.close();
    connections.metas = null;
    dispatch(
      setMetas({
        metas: {},
        loadState: 'none',
      }),
    );
  },
);

export const metasFlows = [
  closeMetas,
  openMetas,
  metasSetActions,
  saveToDBFlow,
  metasLoadedActions,
];

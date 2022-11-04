import { useSnapshot } from 'valtio';
import { worldStore } from '../world';
import { WorldMeta, WorldMetasObject } from './types';
import { metaStore } from '.';
import { useMemo } from 'react';
import { stateObjectToArray } from '@/utils';

// TODO: make sort function or maybe index the metas to dates or something
const sortMetas = (notes: WorldMeta[]): WorldMeta[] => notes;

export const useMetaStore = () => {
  return useSnapshot(metaStore);
};

const useMetasObj = (): WorldMetasObject => {
  return useSnapshot(metaStore.metas);
};

export const useMetas = (): WorldMeta[] => {
  const { metas } = useSnapshot(metaStore);
  // useMemo already runs on render so valtio will still detect access
  // eslint-disable-next-line valtio/state-snapshot-rule
  const sortedMetas = useMemo(() => sortMetas(stateObjectToArray(metas)), [metas]);
  return sortedMetas;
};

export const useCurrentMeta = (): WorldMeta => {
  const meta = useMetasObj()[worldStore.id];
  return meta;
};

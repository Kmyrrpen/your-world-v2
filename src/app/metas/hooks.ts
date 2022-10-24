import { useMemo } from 'react';
import { useSnapshot } from 'valtio';
import { worldStore } from '../world';
import { WorldMeta, WorldMetasObject } from './types';
import { metaStore } from '.';
import { metasToArray } from '@/utils';

// TODO: make sort function or maybe index the metas to dates or something
const sortMetas = (notes: WorldMeta[]): WorldMeta[] => notes;

export const useMetaStore = () => {
  return useSnapshot(metaStore);
};

const useMetasObj = (): WorldMetasObject => {
  const { metas } = useSnapshot(metaStore);
  return metas;
};

export const useMetas = (): WorldMeta[] => {
  const { metas } = useSnapshot(metaStore);
  const sortedMetas = useMemo(() => sortMetas(metasToArray(metas)), [metas]);
  return sortedMetas;
};

export const useCurrentMeta = (): WorldMeta => {
  const meta = useMetasObj()[worldStore.id];
  return meta;
};

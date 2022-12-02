import { useMetaStore } from '.';
import { useWorldStore } from '../world-curr';
import { WorldMeta } from './types';

export const useCurrentMeta = (): WorldMeta => {
  const id = useWorldStore((state) => state.id);
  return useMetaStore((state) => state.metas[id]);
};

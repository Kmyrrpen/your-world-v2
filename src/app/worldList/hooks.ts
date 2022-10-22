import { useSnapshot } from 'valtio';
import { worldList } from '.';

const useWorldMetas = () => {
  const { metas } = useSnapshot(worldList);
  return metas;
};

export default useWorldMetas;

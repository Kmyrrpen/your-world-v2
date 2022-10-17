import { useSnapshot } from "valtio";
import { worldMetas } from ".";

const useWorldMetas = () => {
  const { metas } = useSnapshot(worldMetas);
  return metas;
}

export default useWorldMetas;
import { useMetaStore } from "@/app/metas";
import { useWorldStore } from "@/app/world";
import shallow from "zustand/shallow";

const useCurrentMeta = () => {
  const id = useWorldStore((state) => state.id);
  return useMetaStore((state) => state.metas[id], shallow);
};

export default useCurrentMeta;

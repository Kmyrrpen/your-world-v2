import { useWorldStore } from "@/app/world";
import shallow from "zustand/shallow";

const useSortedTags = () => {
  const tags = useWorldStore(
    (state) =>
      Object.values(state.tags).sort((a, b) => (a.name > b.name ? 1 : -1)),
    shallow,
  );
  return tags;
};

export default useSortedTags;

import { StoreHook } from "@/utils/types";
import { useEffect } from "react";
import { Outlet, useParams } from "react-router-dom";
import { useStore } from "zustand";
import shallow from "zustand/shallow";
import { useMetaStore } from "../metas";
import { useWorldConnection, WorldStore } from "./store";

export const WorldProvider: React.FC = () => {
  const { world } = useParams() as { world: string };
  const { loading, setLoading, connect, disconnect, id } = useWorldConnection();
  const { metas, setMeta } = useMetaStore(
    (state) => ({ metas: state.metas, setMeta: state.setMeta }),
    shallow,
  );

  useEffect(() => {
    if (!metas[world]) {
      setLoading("error");
    } else {
      connect(world).then(() =>
        setMeta({ ...metas[world], recentDateOpened: new Date() }),
      );
    }
    return () => disconnect();
  }, [world]);

  if (loading === "error" || !id || !metas[id]) return <div>error</div>;
  if (loading === "loaded") return <Outlet />;
  return <div>loading</div>;
};

export const useWorldStore: StoreHook<WorldStore> = (selector, equalityFn) => {
  const store = useWorldConnection((state) => state.store);
  if (!store) throw new Error("useWorldStore called without a store.");
  return useStore(store, selector, equalityFn);
};

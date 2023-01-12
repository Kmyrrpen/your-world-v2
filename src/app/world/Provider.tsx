import LoadingMessage from "@/components/LoadingMessage";
import { StoreHook } from "@/utils/types";
import { useEffect } from "react";
import { Outlet, useParams } from "react-router-dom";
import { useStore } from "zustand";
import shallow from "zustand/shallow";
import { useMetaStore } from "../metas";
import { useWorldConnection, WorldStore } from "./store";

export const WorldProvider: React.FC = () => {
  const { world } = useParams() as { world: string };
  const { loading, connect, disconnect } = useWorldConnection();
  const { metas, setMeta } = useMetaStore(
    (state) => ({ metas: state.metas, setMeta: state.setMeta }),
    shallow,
  );

  useEffect(() => {
    if (metas[world]) {
      connect(world).then(() =>
        setMeta({ ...metas[world], recentDateOpened: new Date() }),
      );
    }
    return () => disconnect();
  }, [world]);

  if (!metas[world])
    return (
      <LoadingMessage>
        <span className="text-highlight-error">error:</span> world does not
        exist!
      </LoadingMessage>
    );
  if (loading === "error")
    return (
      <LoadingMessage>
        <span className="text-highlight-error">error:</span> failed to load
        {metas[world].name}!
      </LoadingMessage>
    );
  if (loading === "loaded") return <Outlet />;
  return <LoadingMessage>Loading world...</LoadingMessage>;
};

export const useWorldStore: StoreHook<WorldStore> = (selector, equalityFn) => {
  const store = useWorldConnection((state) => state.store);
  if (!store) throw new Error("useWorldStore called without a store.");
  return useStore(store, selector, equalityFn);
};

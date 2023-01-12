import LoadingMessage from "@/components/LoadingMessage";
import { StoreHook } from "@/utils/types";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useStore } from "zustand";
import { MetaStore, useMetaConnection } from "./store";

export const MetasProvider: React.FC = () => {
  const { loading, connect, disconnect } = useMetaConnection();
  useEffect(() => {
    connect();
    return () => disconnect();
  }, []);

  if (loading === "loaded") return <Outlet />;
  if (loading === "error")
    return (
      <LoadingMessage>
        <span className="text-highlight-error">error:</span> failed to load
        worlds
      </LoadingMessage>
    );
  return <LoadingMessage>Loading worlds...</LoadingMessage>;
};

export const useMetaStore: StoreHook<MetaStore> = (selector, equalityFn) => {
  const store = useMetaConnection((state) => state.store);
  if (!store) throw new Error("useWorldStore called without a store.");
  return useStore(store, selector, equalityFn);
};

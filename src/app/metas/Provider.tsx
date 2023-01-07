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
  if (loading === "error") return <div>error</div>;
  return <div>loading</div>;
};

export const useMetaStore: StoreHook<MetaStore> = (selector, equalityFn) => {
  const store = useMetaConnection((state) => state.store);
  if (!store) throw new Error("useWorldStore called without a store.");
  return useStore(store, selector, equalityFn);
};

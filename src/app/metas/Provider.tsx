import { Outlet } from "react-router-dom";
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { StoreApi, useStore } from "zustand";
import { ContextHook } from "@/utils/types";
import { createMetaStore, MetaStore } from "./store";

type ContextValue = StoreApi<MetaStore> | null;
const metasContext = createContext<ContextValue>(null);

export const MetasProvider: React.FC = () => {
  const metasRef = useRef<ContextValue>(null);
  const [loadState, setLoadState] = useState<
    "idle" | "loading" | "loaded" | "error"
  >("idle");

  // initialize store
  useEffect(() => {
    setLoadState("loading");
    const dbPromise = createMetaStore()
      .then((store) => {
        metasRef.current = store;
        setLoadState("loaded");
        return store;
      })
      .catch(() => {
        metasRef.current = null;
        setLoadState("error");
        return null;
      });

    return () => {
      dbPromise.then((store) => {
        store?.getState().close();
      });
    };
  }, []);

  // world has successfully loaded
  if (loadState === "loaded") {
    return (
      <metasContext.Provider value={metasRef.current}>
        <Outlet />
      </metasContext.Provider>
    );
  }

  // world ran into an error while loading
  if (loadState === "error") {
    return <span>Error</span>;
  }

  return <span>loading metas</span>;
};

export const useMetaStore: ContextHook<MetaStore> = (selector, equalityFn?) => {
  const store = useContext(metasContext);
  if (store === null)
    throw new Error("MetaStore was used without it being instantiated!");
  return useStore(store, selector, equalityFn);
};

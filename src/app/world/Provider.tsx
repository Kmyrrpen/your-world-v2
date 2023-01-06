import { Outlet, useParams } from "react-router-dom";
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { StoreApi, useStore } from "zustand";
import { ContextHook } from "@/utils/types";
import { createWorldStore, WorldStore } from "./store";
import { useMetaStore } from "../metas";
import shallow from "zustand/shallow";

type ContextValue = StoreApi<WorldStore> | null;
const worldContext = createContext<ContextValue>(null);

export const WorldProvider: React.FC = () => {
  const id = useParams<{ world: string }>().world as string;
  const worldRef = useRef<{ store: ContextValue; called: boolean }>({
    store: null,
    called: false,
  });
  const { metas, setMeta } = useMetaStore(
    (state) => ({ metas: state.metas, setMeta: state.setMeta }),
    shallow,
  );
  const [loadState, setLoadState] = useState<
    "idle" | "loading" | "loaded" | "error"
  >("idle");

  // initialize store
  useEffect(() => {
    if (!metas[id]) {
      setLoadState("error");
      return;
    }

    setLoadState("loading");
    const dbPromise = createWorldStore(id)
      .then((store) => {
        worldRef.current.store = store;
        setMeta({ ...metas[id], recentDateOpened: new Date() });
        setLoadState("loaded");
        return store;
      })
      .catch(() => {
        worldRef.current.store = null;
        setLoadState("error");
        return null;
      });

    return () => {
      dbPromise.then((store) => {
        store?.getState().close();
      });
    };
  }, []);

  if (loadState === "loaded" && worldRef.current.store && metas[id]) {
    return (
      <worldContext.Provider value={worldRef.current.store}>
        <Outlet />
      </worldContext.Provider>
    );
  }

  if (loadState === "error") return <span>Error</span>;
  return <span>loading world</span>;
};

export const useWorldStore: ContextHook<WorldStore> = (
  selector,
  equalityFn?,
) => {
  const store = useContext(worldContext);
  if (store === null)
    throw new Error("WorldStore used without it being instantiated!");
  return useStore(store, selector, equalityFn);
};

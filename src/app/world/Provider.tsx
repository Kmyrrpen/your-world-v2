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

type ContextValue = StoreApi<WorldStore> | null;
const worldContext = createContext<ContextValue>(null);

export const WorldProvider: React.FC = () => {
  const id = useParams<{ world: string }>().world as string;
  const worldRef = useRef<{ store: ContextValue; called: boolean }>({
    store: null,
    called: false,
  });
  const [loadState, setLoadState] = useState<
    "idle" | "loading" | "loaded" | "error"
  >("idle");

  // initialize store
  useEffect(() => {
    
    // make sure react only calls this function once
    if (!worldRef.current.called) {
      worldRef.current.called = true;
      setLoadState("loading");
      createWorldStore(id)
        .then((store) => {
          worldRef.current.store = store;
          setLoadState("loaded");
        })
        .catch(() => {
          worldRef.current.store = null;
          setLoadState("error");
        });
    }
  }, []);

  // world has successfully loaded
  if (loadState === "loaded") {
    return (
      <worldContext.Provider value={worldRef.current.store}>
        <Outlet />
      </worldContext.Provider>
    );
  }

  // world ran into an error while loading
  if (loadState === "error") {
    return <span>Error</span>;
  }

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

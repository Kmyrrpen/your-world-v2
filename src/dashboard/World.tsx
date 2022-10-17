import { Outlet, useParams } from "react-router-dom";
import { useEffect } from "react";

import { initializeWorld, unmountWorld } from "@/app/world";
import { useWorld } from "@/app/world/hooks";
import { dispatch } from "@/app/dispatch";

const World = () => {
  const worldId = useParams<{ worldId: string }>().worldId as string;
  const worldSnap = useWorld();

  // on unmount, set the world state back to none
  useEffect(() => {
    if (worldSnap.loadState === "none") {
      dispatch(initializeWorld(worldId));
    }
    return () => {
      dispatch(unmountWorld());
    };
  }, []);

  if (worldSnap.loadState === "error")
    return <div>error: world does not exist!</div>;
  if (worldSnap.loadState === "loaded") return <Outlet />;

  // load state is none or loading
  return <div>Loading...</div>;
};

export default World;

import { useEffect } from 'react';
import { Outlet, useParams } from 'react-router-dom';

import { closeWorld, openWorld } from '@/app/world';
import { useWorld } from '@/app/world/hooks';
import { dispatch } from '@/app/dispatch';

const World: React.FC = () => {
  const worldId = useParams<{ worldId: string }>().worldId as string;
  const world = useWorld();

  // on unmount, close the world
  useEffect(() => {
    if (world.loadState === 'none') {
      dispatch(openWorld(worldId));
    }
    return () => {
      dispatch(closeWorld());
    };
  }, []);

  if (world.loadState === 'error')
    return <div>error: world does not exist!</div>;
  if (world.loadState === 'loaded') return <Outlet />;

  // load state is none or loading
  return <div>Loading...</div>;
};

export default World;

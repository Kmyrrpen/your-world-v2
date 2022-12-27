import { useEffect, useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import shallow from 'zustand/shallow';

import { LoadState } from '@/utils/types';
import { useWorldStore } from '@/app/world-curr';
import { useMetaStore } from '@/app/world-metas';

const World: React.FC = () => {
  const worldId = useParams<{ worldId: string }>().worldId as string;
  const metas = useMetaStore((state) => state.metas);
  const { hydrate, reset } = useWorldStore(
    (state) => ({
      hydrate: state.hydrateStore,
      reset: state.resetStore,
    }),
    shallow,
  );
  const [loading, setLoading] = useState<LoadState>(
    metas[worldId] ? 'loading' : 'error',
  );

  useEffect(() => {
    if (metas[worldId]) {
      // tell world store to hydrate a specific world
      hydrate(worldId)
        .then(() => setLoading('loaded'))
        .catch(() => setLoading('error'));
    }
    return () => {
      reset();
    };
  }, []);

  // we check if world id still exists on metas in
  // the case of world database deletion, since children
  // will assume that the world store and worldDB connection exists.
  if (loading === 'error' || !metas[worldId])
    return <div>error: world does not exist!</div>;
    
  if (loading === 'loading') return <div>Loading...</div>;

  return <Outlet />;
};

export default World;

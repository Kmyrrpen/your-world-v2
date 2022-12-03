import { useEffect, useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import shallow from 'zustand/shallow';

import { LoadState } from '@/utils/types';
import { useWorldStore } from '@/app/world-curr';
import { useMetaStore } from '@/app/world-metas';

const World: React.FC = () => {
  const worldId = useParams<{ worldId: string }>().worldId as string;
  const metas = useMetaStore((state) => state.metas);
  const [loading, setLoading] = useState<LoadState>('loading');
  const { hydrate, reset } = useWorldStore(
    (state) => ({
      hydrate: state.hydrateStore,
      reset: state.resetStore,
    }),
    shallow,
  );

  useEffect(() => {
    // check if world exists
    if (!metas[worldId]) {
      setLoading('error');
    } else {
      // tell world store to hydrate a specific world
      hydrate(worldId)
        .then(() => setLoading('loaded'))
        .catch(() => setLoading('error'));
    }
    return () => {
      reset();
    };
  }, []);

  if (loading === 'error') return <div>error: world does not exist!</div>;
  if (loading === 'loading') return <div>Loading...</div>;

  return <Outlet />;
};

export default World;

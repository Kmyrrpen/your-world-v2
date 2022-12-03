import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

import { LoadState } from '@/utils/types';
import { useMetaStore } from '@/app/world-metas';
import shallow from 'zustand/shallow';

const Metas: React.FC = () => {
  const [loading, setLoading] = useState<LoadState>('loading');
  const { hydrate, reset } = useMetaStore(
    (state) => ({ hydrate: state.hydrateStore, reset: state.resetStore }),
    shallow,
  );

  useEffect(() => {
    hydrate()
      .then(() => setLoading('loaded'))
      .catch(() => setLoading('error'));
    return () => {
      reset();
    };
  }, []);

  // not sure what to do here, the only way this would happen
  // should be when loading metas gets an IDB error
  if (loading === 'error') return <div>error: something went wrong..</div>;
  if (loading === 'loaded') return <Outlet />;

  // load state is none or loading
  return <div>Metas Loading...</div>;
};

export default Metas;

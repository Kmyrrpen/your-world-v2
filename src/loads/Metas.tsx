import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useMetaStore } from '@/app/world-metas';
import { closeMetaDB, openMetaDB } from '@/app/world-metas/db';

const Metas: React.FC = () => {
  const loadState = useMetaStore((state) => state.loadState);

  useEffect(() => {
    openMetaDB();
    return () => {
      closeMetaDB();
    };
  }, []);

  // not sure what to do here, the only way this would happen
  // should be when loading metas gets an IDB error
  if (loadState === 'error') return <div>error: something went wrong..</div>;
  if (loadState === 'loaded') return <Outlet />;

  // load state is none or loading
  return <div>Metas Loading...</div>;
};

export default Metas;

import { dispatch } from '@/app/dispatch';
import { closeMetas, openMetas } from '@/app/metas';
import { useMetaStore } from '@/app/metas/hooks';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

const Metas: React.FC = () => {
  const metas = useMetaStore();

  useEffect(() => {
    dispatch(openMetas());
    return () => dispatch(closeMetas());
  }, []);

  // not sure what to do here, the only way this would happen
  // should be when loading metas gets an IDB error
  if (metas.loadState === 'error')
    return <div>error: something went wrong..</div>;
  if (metas.loadState === 'loaded') return <Outlet />;

  // load state is none or loading
  return <div>Metas Loading...</div>;
};

export default Metas;

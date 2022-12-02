import { useEffect } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { useWorldStore } from '@/app/world-curr';
import { closeWorldDB, openWorldDB } from '@/app/world-curr/db';

const World: React.FC = () => {
  const worldId = useParams<{ worldId: string }>().worldId as string;
  const loadState = useWorldStore((state) => state.loadState);

  useEffect(() => {
    if (loadState !== 'loading' && loadState !== 'loaded') {
      openWorldDB(worldId);
    }
    return () => {
      closeWorldDB();
    };
  }, []);

  if (loadState === 'error') return <div>error: world does not exist!</div>;
  if (loadState === 'loaded') return <Outlet />;

  // load state is none or loading
  return <div>Loading...</div>;
};

export default World;

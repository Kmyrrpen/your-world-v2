import { useMetas } from '@/app/metas/hooks';
import WorldListItem from './WorldListItem';

const WorldList: React.FC = () => {
  const metas = useMetas();

  return (
    <div className="mb-20 flex flex-col gap-4">
      {metas.length > 0 ? (
        <>
          <span className="text-center font-medium">existing worlds:</span>
          <ul className="flex flex-col">
            {metas.map((meta) => (
              <WorldListItem meta={meta} key={meta.id} />
            ))}
          </ul>
        </>
      ) : null}
    </div>
  );
};

export default WorldList;

import { useMetas } from '@/app/metas/hooks';
import WorldListItem from './WorldListItem';

const WorldList: React.FC = () => {
  const metas = useMetas();

  return (
    <div className="mb-16">
      {metas.length > 0 ? (
        <ul className="flex flex-col gap-2 md:gap-6">
          {metas.map((meta) => (
            <WorldListItem meta={meta} key={meta.id} />
          ))}
        </ul>
      ) : null}
    </div>
  );
};

export default WorldList;

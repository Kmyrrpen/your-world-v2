import { useMetaStore } from '@/app/world-metas';
import { stateObjectToArray } from '@/utils';
import WorldListItem from './WorldListItem';

const WorldList: React.FC = () => {
  const metas = useMetaStore(state => stateObjectToArray(state.metas))
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

import { Link } from 'react-router-dom';
import { WorldMeta } from '@/app/metas/types';
import { ReactComponent as WorldIcon } from '@/assets/world.svg';
import { ReactComponent as ArrowRight } from '@/assets/arrow-right.svg';
import Button from '@/components/Button';

type Props = {
  meta: WorldMeta;
};

const WorldListItem: React.FC<Props> = ({ meta }) => {
  return (
    <li className="max-w-md lg:max-w-lg">
      <Link className="flex items-center gap-3" to={meta.id}>
        <WorldIcon className="w-8 sm:w-10" />
        <div className='flex flex-col'>
          <span className="font-bold block leading-tight mb-1">{meta.name}</span>
          <span className='text-sm leading-none'>last edited: 02/20/2022</span>
        </div>
        <ArrowRight className="ml-auto" />

        <Button render={(props) => <span {...props} />} className="hidden">
          Visit World
        </Button>
      </Link>
    </li>
  );
};

export default WorldListItem;

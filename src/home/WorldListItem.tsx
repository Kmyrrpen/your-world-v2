import { Link } from 'react-router-dom';
import { WorldMeta } from '@/app/world-metas/types';
import { ReactComponent as WorldIcon } from '@/assets/world.svg';

import Icons from '@/components/Icons';
import IconButton from '@/components/IconButton';

type Props = {
  meta: WorldMeta;
};

const WorldListItem: React.FC<Props> = ({ meta }) => {
  return (
    <li className="max-w-md lg:max-w-lg">
      <Link className="flex items-center gap-3" to={meta.id}>
        <WorldIcon className="w-8 sm:w-10" />

        <div className="flex flex-col">
          <span className="mb-1 block font-bold leading-tight">
            {meta.name}
          </span>
          <span className="text-sm leading-none">last edited: 02/20/2022</span>
        </div>

        <IconButton className="ml-auto">
          <Icons.ArrowRight />
        </IconButton>
      </Link>
    </li>
  );
};

export default WorldListItem;

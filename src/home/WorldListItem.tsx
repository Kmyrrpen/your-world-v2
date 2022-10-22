import { WorldMeta } from '@/app/worldList/types';
import { Link } from 'react-router-dom';
import { ReactComponent as WorldIcon } from '@/assets/world-icon.svg';
import { ReactComponent as ArrowRight } from '@/assets/arrow-right.svg';
import Button from '@/components/Button';

type Props = {
  meta: WorldMeta;
};

const WorldListItem: React.FC<Props> = ({ meta }) => {
  return (
    <li className="mx-auto w-full max-w-2xl sm:px-5">
      <Link
        className="flex w-full flex-row items-center gap-4 p-2"
        to={meta.id}
      >
        <WorldIcon className="h-auto w-14 md:w-16" />
        <span className="grow text-base font-medium">{meta.name}</span>
        <ArrowRight className="h-10 dark:fill-white sm:hidden md:w-20" />
        <Button as="span" className="hidden w-max sm:inline-block">
          Visit World
        </Button>
      </Link>
    </li>
  );
};

export default WorldListItem;

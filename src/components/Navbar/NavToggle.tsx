import { ReactComponent as MenuIcon } from '@/assets/menu-icon.svg';
import classNames from 'classnames';

type Props = {
  onClick: () => void;
  className?: string;
};

const NavToggle: React.FC<Props> = ({ onClick, className }) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className={classNames(
        className,
        'inline-flex items-center rounded-lg p-2 text-sm text-black hover:bg-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-200 dark:text-white dark:hover:bg-black dark:focus:ring-zinc-600 md:hidden',
      )}
      aria-controls="navbar-default"
      aria-expanded="false"
    >
      <span className="sr-only">Open main menu</span>
      <MenuIcon className="h-6 w-6" />
    </button>
  );
};

export default NavToggle;

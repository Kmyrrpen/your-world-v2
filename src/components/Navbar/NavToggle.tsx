import { ReactComponent as MenuIcon } from '@/assets/menu-icon.svg';
import { twMerge } from 'tailwind-merge';
import Icon from '../IconHighlight';

type Props = {
  onClick: () => void;
  className?: string;
};

const NavToggle: React.FC<Props> = ({ onClick, className }) => {
  return (
    <Icon
      onClick={onClick}
      type="button"
      className={twMerge('inline-flex items-center md:hidden ', className)}
      aria-controls="navbar-default"
      aria-expanded="false"
    >
      <span className="sr-only">Open main menu</span>
      <MenuIcon className="h-6 w-6" />
    </Icon>
  );
};

export default NavToggle;

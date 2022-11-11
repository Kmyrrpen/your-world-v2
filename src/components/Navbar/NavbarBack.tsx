import { Link } from 'react-router-dom';
import { ReactComponent as ArrowLeft } from '@/assets/arrow-left.svg';

const NavbarBack: React.FC = () => (
  <Link to={'../'} className="flex gap-2 p-2 pl-0" relative="path">
    <ArrowLeft className="dark:fill-white" />
    <span className="hidden sm:inline">Back</span>
  </Link>
);

export default NavbarBack;

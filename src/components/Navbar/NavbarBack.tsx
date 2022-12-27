import { Link } from 'react-router-dom';
import IconButton from '../IconButton';
import Icons from '../Icons';

const NavbarBack: React.FC = () => (
  <Link to={'../'} className="flex gap-2 p-2 pl-0" relative="path">
    <IconButton>
      <Icons.ArrowLeft />
      <span className="text-base font-bold hidden sm:inline">back</span>
    </IconButton>
  </Link>
);

export default NavbarBack;

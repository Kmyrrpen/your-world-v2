import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from '@/assets/logo.svg';

const NavbarLogo: React.FC = () => {
  return (
    <Link to={'/'} className="w-10 block">
      <Logo />
    </Link>
  );
};

export default NavbarLogo;

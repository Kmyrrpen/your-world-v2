import { Link } from 'react-router-dom';
import { useWorld } from '@/app/world/hooks';
import useNavbarToggle from '@/hooks/useNavbarToggle';
import Button from '@/components/Button';
import Navbar from '@/components/Navbar';

type Props = {
  /** use the logo instead of a back button */
  isLogoBack?: boolean;
};

const DefaultNavbar: React.FC<Props> = ({ isLogoBack }) => {
  const world = useWorld();
  const { menuRef, onToggle, toggle } = useNavbarToggle();

  return (
    <Navbar>
      {isLogoBack ? <Navbar.Logo /> : <Navbar.BackButton />}
      <Navbar.ThemeToggle />
      <Navbar.Toggle onClick={onToggle} />
      <Navbar.Menu ref={menuRef} toggle={toggle}>
        <li>
          <Navbar.Link to={`/${world.id}`}>dashboard</Navbar.Link>
        </li>
        <li>
          <Navbar.Link to={`/${world.id}/tags`}>see tags</Navbar.Link>
        </li>
        <li className="md:hidden">
          <Navbar.Link to={`/${world.id}/new`}>create new</Navbar.Link>
        </li>
        <li>
          <Button
            as={Link}
            className="hidden md:inline-block"
            to={`/${world.id}/new`}
          >
            New Note
          </Button>
        </li>
      </Navbar.Menu>
    </Navbar>
  );
};

export default DefaultNavbar;

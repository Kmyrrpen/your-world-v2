import Navbar from '@/components/Navbar';
import useNavbarToggle from '@/hooks/useNavbarToggle';

const HomeNavbar: React.FC = () => {
  const { menuRef, toggle, onToggle } = useNavbarToggle();

  return (
    <Navbar>
      <Navbar.Logo hasText />
      <Navbar.ThemeToggle />
      <Navbar.Toggle onClick={onToggle} />
      <Navbar.Menu ref={menuRef} toggle={toggle}>
        <li>
          <Navbar.Link to="/how-to-use">instructions</Navbar.Link>
        </li>
        <li>
          <Navbar.Link to="/contact">contact</Navbar.Link>
        </li>
      </Navbar.Menu>
    </Navbar>
  );
};

export default HomeNavbar;

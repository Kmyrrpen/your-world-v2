import Navbar from '@/components/Navbar';

const HomeNavbar: React.FC = () => {
  return (
    <Navbar>
      <Navbar.Logo hasText />
      <Navbar.ThemeToggle />
      <Navbar.Menu>
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

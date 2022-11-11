import Navbar from '@/components/Navbar';

const HomeNavbar: React.FC = () => {
  return (
    <Navbar>
      <Navbar.Logo />
      <Navbar.Menu>
        <Navbar.MenuItem>
          <Navbar.Link to="/how-to-use">instructions</Navbar.Link>
        </Navbar.MenuItem>
        <Navbar.MenuItem>
          <Navbar.Link to="/contact">contact</Navbar.Link>
        </Navbar.MenuItem>
      </Navbar.Menu>
    </Navbar>
  );
};

export default HomeNavbar;

import { useWorld } from '@/app/world/hooks';
import Navbar from '@/components/Navbar';

type Props = {
  isBack?: boolean;
};

const DashboardNavbar: React.FC<Props> = ({ isBack }) => {
  const world = useWorld();

  return (
    <Navbar>
      {isBack ? <Navbar.Back /> : <Navbar.Logo />}
      <Navbar.Menu>
        <Navbar.MenuItem>
          <Navbar.Link to={`/${world.id}`}>dashboard</Navbar.Link>
        </Navbar.MenuItem>
        <Navbar.MenuItem>
          <Navbar.Link to={`/${world.id}/tags`}>see tags</Navbar.Link>
        </Navbar.MenuItem>
      </Navbar.Menu>
    </Navbar>
  );
};

export default DashboardNavbar;

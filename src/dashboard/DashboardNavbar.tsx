import { useWorldStore } from '@/app/world-curr';
import Navbar from '@/components/Navbar';

type Props = {
  isBack?: boolean;
};

const DashboardNavbar: React.FC<Props> = ({ isBack }) => {
  const id = useWorldStore((state) => state.id);

  return (
    <Navbar>
      {isBack ? <Navbar.Back /> : <Navbar.Logo />}
      <Navbar.Menu>
        <Navbar.MenuItem>
          <Navbar.Link to={`/${id}`}>dashboard</Navbar.Link>
        </Navbar.MenuItem>
        <Navbar.MenuItem>
          <Navbar.Link to={`/${id}/tags`}>see tags</Navbar.Link>
        </Navbar.MenuItem>
      </Navbar.Menu>
    </Navbar>
  );
};

export default DashboardNavbar;

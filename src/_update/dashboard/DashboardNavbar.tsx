import { WorldMeta } from '@/app/world-metas/types';
import Navbar from '@/components/Navbar';

type Props = {
  currentMeta: WorldMeta;
};

const DashboardNavbar: React.FC<Props> = ({ currentMeta }) => {
  return (
    <Navbar>
      <Navbar.Logo />
      <Navbar.Menu>
        <Navbar.MenuItem>
          <Navbar.Link to={`/${currentMeta.id}`}>dashboard</Navbar.Link>
        </Navbar.MenuItem>
        <Navbar.MenuItem>
          <Navbar.Link to={`/${currentMeta.id}/tags`}>see tags</Navbar.Link>
        </Navbar.MenuItem>
      </Navbar.Menu>
    </Navbar>
  );
};

export default DashboardNavbar;

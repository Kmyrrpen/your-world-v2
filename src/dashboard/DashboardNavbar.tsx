import { useWorld } from '@/app/world/hooks';

import Button from '@/components/Button';
import Navbar from '@/components/Navbar';
import { Link } from 'react-router-dom';
import WorldSettings from './WorldSettings';

type Props = {
  isBack?: boolean;
};

const DashboardNavbar: React.FC<Props> = ({ isBack }) => {
  const world = useWorld();

  return (
    <Navbar>
      {isBack ? <Navbar.BackButton /> : <Navbar.Logo />}
      <WorldSettings />
      <Navbar.Menu>
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
            render={(props) => <Link to={`/${world.id}/new`} {...props} />}
            className="hidden md:inline-block"
          >
            New Note
          </Button>
        </li>
      </Navbar.Menu>
    </Navbar>
  );
};

export default DashboardNavbar;

import { useState } from 'react';
import { WorldMeta } from '@/app/world-metas/types';
import Navbar from '@/components/Navbar';
import WorldSettings from './WorldSettings';

type Props = {
  currentMeta: WorldMeta;
};

const DashboardNavbar: React.FC<Props> = ({ currentMeta }) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <Navbar>
      {/* this is on a portal anyways */}
      {isSettingsOpen ? (
        <WorldSettings onClose={() => setIsSettingsOpen(false)} />
      ) : null}

      <Navbar.Logo />
      <Navbar.Menu>
        
        <Navbar.MenuItem>
          <Navbar.Link as={'button'} onClick={() => setIsSettingsOpen(true)}>
            settings
          </Navbar.Link>
        </Navbar.MenuItem>

        <Navbar.MenuItem>
          <Navbar.Link to={`/${currentMeta.id}/new`}>create new</Navbar.Link>
        </Navbar.MenuItem>
      </Navbar.Menu>
    </Navbar>
  );
};

export default DashboardNavbar;

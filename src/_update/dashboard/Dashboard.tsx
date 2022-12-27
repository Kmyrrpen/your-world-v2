import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useCurrentMeta } from '@/app/world-metas/hooks';

import Container from '@/components/Container';
import Header from '@/components/Header';
import Button from '@/components/Button';
import Icons from '@/components/Icons';
import DashboardNavbar from './DashboardNavbar';
import WorldSettings from './WorldSettings';

const Dashboard = () => {
  const meta = useCurrentMeta();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <Container>
      <DashboardNavbar currentMeta={meta} />
      {isSettingsOpen ? (
        <WorldSettings onClose={() => setIsSettingsOpen(false)} />
      ) : null}

      <Header>
        <Header.Title>{meta.name}</Header.Title>
        <div className="flex flex-wrap gap-3">
          <Button onClick={() => setIsSettingsOpen(true)}>
            <span>Edit World</span>
            <Icons.Settings />
          </Button>
          <Button as={Link} to={'new'}>
            <span>Create Note</span>
            <Icons.ArrowRight />
          </Button>
        </div>
      </Header>

      <Outlet />
    </Container>
  );
};

export default Dashboard;

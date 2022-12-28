import { NavLink, Outlet } from 'react-router-dom';
import { useCurrentMeta } from '@/app/world-metas/hooks';

import Container from '@/components/Container';
import DashboardNavbar from './DashboardNavbar';

const Dashboard = () => {
  const meta = useCurrentMeta();

  return (
    <Container>
      <DashboardNavbar currentMeta={meta} />
      <div className="flex flex-wrap">
        <NavLink
          end
          to={''}
          className={({ isActive }) =>
            'p-2 text-center w-16 ' + (isActive ? 'bg-gray-900 text-white' : '')
          }
        >
          <span>Notes</span>
        </NavLink>
        <NavLink
          to={'tags'}
          className={({ isActive }) =>
            'p-2 text-center w-16 ' + (isActive ? 'bg-gray-900 text-white' : '')
          }
        >
          <span>Tags</span>
        </NavLink>
      </div>

      <Outlet />
    </Container>
  );
};

export default Dashboard;

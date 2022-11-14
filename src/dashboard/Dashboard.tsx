import { Link } from 'react-router-dom';
import { useCurrentMeta } from '@/app/metas/hooks';
import { useNotes } from '@/app/world/hooks';

import { Icons } from '@/components/Icons';
import Container from '@/components/Container';
import Header from '@/components/Header';
import Button from '@/components/Button';
import DashboardNavbar from './DashboardNavbar';
import EditWorld from './EditWorld';
import Notes from './Notes';

const Dashboard: React.FC = () => {
  const notes = useNotes();
  const meta = useCurrentMeta();

  return (
    <Container>
      <DashboardNavbar />
      <Header>
        <Header.Title>{meta.name}</Header.Title>
        <div className="flex flex-wrap gap-3">
          <EditWorld />
          <Button render={(props) => <Link to={'./new'} {...props} />}>
            create note
            <Icons.ArrowRight />
          </Button>
        </div>
      </Header>
      <Notes notes={notes} />
    </Container>
  );
};

export default Dashboard;

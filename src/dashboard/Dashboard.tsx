import { useCurrentMeta } from '@/app/metas/hooks';
import { useNotes } from '@/app/world/hooks';
import Container from '@/components/Container';
import PageTitle from '@/components/PageTitle';
import NoteList from '@/dashboard/NoteList';
import DashboardNavbar from './DashboardNavbar';

const Dashboard: React.FC = () => {
  const notes = useNotes();
  const meta = useCurrentMeta();

  return (
    <Container>
      <DashboardNavbar />
      <PageTitle>{meta.name}</PageTitle>
      <NoteList notes={notes} />
    </Container>
  );
};

export default Dashboard;

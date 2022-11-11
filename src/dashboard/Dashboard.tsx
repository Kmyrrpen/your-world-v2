import { useCurrentMeta } from '@/app/metas/hooks';
import { useNotes } from '@/app/world/hooks';
import Container from '@/components/Container';
import Header from '@/components/Header';
import NoteList from './NoteList';
import DashboardNavbar from './DashboardNavbar';

const Dashboard: React.FC = () => {
  const notes = useNotes();
  const meta = useCurrentMeta();

  return (
    <Container>
      <DashboardNavbar />
      <Header>
        <Header.Title>{meta.name}</Header.Title>
      </Header>
      <NoteList notes={notes} />
    </Container>
  );
};

export default Dashboard;

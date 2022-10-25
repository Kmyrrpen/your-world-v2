import { useCurrentMeta } from '@/app/metas/hooks';
import { useNotes, useTagsObj } from '@/app/world/hooks';
import Container from '@/components/Container';
import NoteList from '@/components/NoteList';
import DashboardNavbar from './DashboardNavbar';

const Dashboard: React.FC = () => {
  const notes = useNotes();
  const meta = useCurrentMeta();
  const tagsObj = useTagsObj();

  return (
    <Container>
      <DashboardNavbar />
      <h1 className="mb-4 text-3xl font-medium sm:text-4xl md:mb-6 md:mt-12 md:text-5xl">
        {meta.name}
      </h1>
      <NoteList notes={notes} tagsObj={tagsObj} />
    </Container>
  );
};

export default Dashboard;

import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useWorld } from '@/app/world/hooks';
import { notesToArray } from '@/utils';

import NoteList from '@/dashboard/NoteList';
import DashboardNavbar from '@/dashboard/DashboardNavbar';
import Container from '@/components/Container';
import PageTitle from '@/components/PageTitle';

const Tagpage = () => {
  const { notes, tags } = useWorld();
  const id = useParams<{ id: string }>().id as string;
  const tag = tags[id];

  const filteredNotes = useMemo(
    () =>
      notesToArray(notes).filter(
        (note) => note.tagIds.findIndex((tagId) => tagId === tag.id) !== -1,
      ),
    [tag, notes],
  );

  if (!tag) return <div>error: tag does not exist</div>;

  return (
    <Container>
      <DashboardNavbar />
      <PageTitle>{tag.name}</PageTitle>
      <p>{tag.description}</p>
      <NoteList notes={filteredNotes} />
    </Container>
  );
};

export default Tagpage;

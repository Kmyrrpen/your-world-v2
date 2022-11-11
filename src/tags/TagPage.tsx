import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useWorld } from '@/app/world/hooks';

import NoteList from '@/dashboard/NoteList';
import Container from '@/components/Container';
import DashboardNavbar from '@/dashboard/DashboardNavbar';
import { stateObjectToArray } from '@/utils';
import Header from '@/components/Header';

const Tagpage = () => {
  const { notes, tags } = useWorld();
  const id = useParams<{ id: string }>().id as string;
  const tag = tags[id];

  const filteredNotes = useMemo(
    () =>
      stateObjectToArray(notes).filter(
        (note) => note.tagIds.findIndex((tagId) => tagId === tag.id) !== -1,
      ),
    [tag, notes],
  );

  if (!tag) return <div>error: tag does not exist</div>;

  return (
    <Container>
      <DashboardNavbar isBack />
      <Header>
        <Header.Title># {tag.name}</Header.Title>
      </Header>
      <p>{tag.description}</p>
      <NoteList notes={filteredNotes} />
    </Container>
  );
};

export default Tagpage;

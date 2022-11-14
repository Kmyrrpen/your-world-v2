import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useWorld } from '@/app/world/hooks';

import Notes from '@/dashboard/Notes';
import Container from '@/components/Container';
import DashboardNavbar from '@/dashboard/DashboardNavbar';
import { stateObjectToArray } from '@/utils';
import Header from '@/components/Header';
import EditTag from './EditTag';

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
        <div className="flex flex-wrap gap-3">
          <EditTag tag={tag} tagsObj={tags} />
        </div>
      </Header>
      <p>{tag.description}</p>
      <Notes notes={filteredNotes} />
    </Container>
  );
};

export default Tagpage;

import { useMemo } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import shallow from 'zustand/shallow';

import Notes from '@/dashboard/Notes';
import Container from '@/components/Container';
import DashboardNavbar from '@/dashboard/DashboardNavbar';
import { stateObjectToArray } from '@/utils';
import { useWorldStore } from '@/app/world-curr';

import Header from '@/components/Header';
import Icons from '@/components/Icons';

const Tag = () => {
  const { notes, tags } = useWorldStore(
    (state) => ({
      tags: state.tags,
      notes: state.notes,
    }),
    shallow,
  );

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
        <Link to={'settings'}>
          edit tag
          <Icons.Settings />
        </Link>
      </Header>
      <p>{tag.description}</p>
      <Notes notes={filteredNotes} />
    </Container>
  );
};

export default Tag;

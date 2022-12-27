import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import shallow from 'zustand/shallow';

import Notes from '@/dashboard/Notes';
import Container from '@/components/Container';
import { useWorldStore } from '@/app/world-curr';
import { stateObjectToArray } from '@/utils';

import Header from '@/components/Header';
import Icons from '@/components/Icons';
import Button from '@/components/Button';
import EditTagModal from './TagModal';

const Tag = () => {
  const { notes, tags } = useWorldStore(
    (state) => ({
      tags: state.tags,
      notes: state.notes,
    }),
    shallow,
  );
  const [isEditTagOpen, setIsEditTagOpen] = useState(false);

  // get current tag
  const id = useParams<{ id: string }>().id as string;
  const tag = tags[id];

  // get notes that have this tag
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
      {isEditTagOpen ? (
        <EditTagModal onClose={() => setIsEditTagOpen(false)} tag={tag} />
      ) : null}

      <Header>
        <Header.Title># {tag.name}</Header.Title>
        <Button onClick={() => setIsEditTagOpen(true)}>
          Edit Tag
          <Icons.Settings />
        </Button>
      </Header>
      <p>{tag.description}</p>
      <Notes notes={filteredNotes} />
    </Container>
  );
};

export default Tag;

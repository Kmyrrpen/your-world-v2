import { useWorldStore } from '@/app/world-curr';
import IconButton from '@/components/IconButton';
import Modal from '@/components/Modal';
import { stateObjectToArray } from '@/utils';
import { Link, useNavigate } from 'react-router-dom';
import shallow from 'zustand/shallow';

const WorldTags: React.FC = () => {
  const navigate = useNavigate();
  const goBack = () => navigate('../');

  const { tags, deleteTag } = useWorldStore(
    (state) => ({
      tags: stateObjectToArray(state.tags),
      deleteTag: state.deleteTag,
    }),
    shallow,
  );

  return (
    <Modal>
      <Modal.Background onClick={goBack} />
      <Modal.Container>
        <h2 className="mb-2 text-lg font-bold">Tags</h2>
        <ul>
          {tags.map((tag) => (
            <li
              className="flex justify-between border-b border-b-neutral-200 py-2 last:border-b-0"
              key={tag.id}
            >
              <Link to={tag.id} className="flex-1">
                <span>{tag.name}</span>
              </Link>
              <IconButton onClick={() => deleteTag(tag)}>Delete</IconButton>
            </li>
          ))}
        </ul>
      </Modal.Container>
    </Modal>
  );
};

export default WorldTags;

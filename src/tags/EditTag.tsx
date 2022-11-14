import { useRef, useState } from 'react';
import { cloneDeep } from 'lodash';

import { Tag, TagsObject } from '@/app/world/types';
import { Icons } from '@/components/Icons';
import Button from '@/components/Button';
import Modal from '@/components/Modal';
import EditTagForm from './EditTagForm';

type Props = {
  tag: Tag;
  tagsObj: TagsObject;
};

const EditTag: React.FC<Props> = ({ tag }) => {
  const [show, setShow] = useState(false);
  const { current: clonedTag } = useRef({ ...cloneDeep(tag), id: undefined });
  const onToggle = () => setShow((prev) => !prev);

  return (
    <div>
      <Button onClick={onToggle}>
        edit tag
        <Icons.Settings />
      </Button>
      {show && (
        <Modal>
          <Modal.Background onClick={onToggle} />
          <Modal.Container>
            <EditTagForm tag={tag} onToggle={onToggle} tagValues={clonedTag} />
          </Modal.Container>
        </Modal>
      )}
    </div>
  );
};

export default EditTag;

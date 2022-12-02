import { useState } from 'react';
import { useCurrentMeta } from '@/app/world-metas/hooks';

import { Icons } from '@/components/Icons';
import Button from '@/components/Button';
import Modal from '@/components/Modal';
import EditWorldForm from './EditWorldForm';

const EditWorld: React.FC = () => {
  const currentMeta = useCurrentMeta();
  const [show, setShow] = useState(false);

  const onToggle = () => {
    setShow((prev) => !prev);
  };

  return (
    <div>
      <Button onClick={onToggle}>
        edit world
        <Icons.Settings />
      </Button>
      {show ? (
        <Modal>
          <Modal.Background onClick={onToggle} />
          <Modal.Container>
            <EditWorldForm
              meta={currentMeta}
              onToggle={onToggle}
            />
          </Modal.Container>
        </Modal>
      ) : null}
    </div>
  );
};

export default EditWorld;

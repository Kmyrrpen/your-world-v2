import { useMemo, useState } from 'react';
import { cloneDeep } from 'lodash';
import { useForm } from 'react-hook-form';
import { Tag, TagsObject } from '@/app/world-curr/types';

import { Icons } from '@/components/Icons';
import Button from '@/components/Button';
import Modal from '@/components/Modal';
import EditTagForm, { EditTagFormVals } from './EditTagForm';

type Props = {
  tag: Tag;
  tagsObj: TagsObject;
};

const EditTag: React.FC<Props> = ({ tag }) => {
  const [show, setShow] = useState(false);
  const clonedTag = useMemo(
    () => ({ ...cloneDeep(tag), id: undefined }),
    [tag],
  );

  const formData = useForm<EditTagFormVals>({ defaultValues: clonedTag });
  const onToggle = () => {
    setShow((prev) => !prev);
    formData.reset();
  };

  return (
    <div>
      <Button onClick={onToggle}>
        edit tag
        <Icons.Settings />
      </Button>
      <Modal className={!show ? 'hidden' : ''}>
        <Modal.Background onClick={onToggle} />
        <Modal.Container>
          <EditTagForm tag={tag} onToggle={onToggle} formData={formData} />
        </Modal.Container>
      </Modal>
    </div>
  );
};

export default EditTag;

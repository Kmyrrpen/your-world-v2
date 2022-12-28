import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { useMetaStore } from '@/app/world-metas';
import { useCurrentMeta } from '@/app/world-metas/hooks';
import { closeWorldConnection, connection, deleteWorldDB } from '@/app/db';

import Button from '@/components/Button';
import FormField from '@/components/FormField';
import shallow from 'zustand/shallow';
import Modal from '@/components/Modal';
import { useWorldStore } from '@/app/world-curr';

type Props = {
  onClose: () => void;
};

const WorldSettings: React.FC<Props> = ({ onClose }) => {
  const navigate = useNavigate();
  const currentMeta = useCurrentMeta();

  const { updateMeta, deleteMeta } = useMetaStore(
    (state) => ({
      updateMeta: state.setMeta,
      deleteMeta: state.deleteMeta,
    }),
    shallow,
  );

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<{
    name: string;
  }>({
    defaultValues: currentMeta,
  });

  const onUpdate = handleSubmit(async ({ name }) => {
    await updateMeta({ ...currentMeta, name });
    onClose();
  });

  const onDelete = async () => {
    const confirmed = confirm(
      `Are you sure you want to delete ${currentMeta.name}?`,
    );
    if (confirmed) {
      await deleteWorldDB(currentMeta.id, () => {
        alert('close all other tabs that accesses this world before deleting.');
      });
      await deleteMeta(currentMeta);
      navigate('/');
    }
  };

  return (
    <Modal>
      <Modal.Background onClick={onClose} />
      <Modal.Container>
        <form className="flex flex-1 flex-col" onSubmit={onUpdate}>
          <h2 className="text-lg font-bold">World Settings</h2>
          <FormField className="my-1 flex flex-col pr-3">
            <FormField.Label className="text-sm text-gray-600" htmlFor="name">
              world name
            </FormField.Label>
            <FormField.Input
              id="name"
              {...register('name', { required: "can't be empty" })}
            />
            {errors.name && <FormField.Error message={errors.name.message} />}
          </FormField>

          <div className="mt-auto flex items-center justify-end gap-5">
            <div onClick={onDelete}>delete</div>
            <Button type="submit">save</Button>
          </div>
        </form>
      </Modal.Container>
    </Modal>
  );
};

export default WorldSettings;

import { useForm } from 'react-hook-form';

import { useCurrentMeta } from '@/app/metas/hooks';
import Button from '@/components/Button';
import { Icons } from '@/components/Icons';
import Modal from '@/components/Modal';
import { useState } from 'react';
import { dispatch } from '@/app/dispatch';
import { createMeta } from '@/app/metas';
import { deleteWorld } from '@/app/world';
import FormField from '@/components/FormField';

type FormValues = {
  name: string;
};

const EditWorld: React.FC = () => {
  const currentMeta = useCurrentMeta();
  const [show, setShow] = useState(false);

  const onToggle = () => setShow((prev) => !prev);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: { name: currentMeta.name },
  });

  const onDelete = () => {
    const confirmation = confirm(
      `Are you sure you want to delete ${currentMeta.name}?`,
    );
    if (confirmation) {
      dispatch(deleteWorld());
      onToggle();
    }
  };

  const onSubmit = handleSubmit(({ name }) => {
    dispatch(createMeta({ ...currentMeta, name }));
    onToggle();
  });

  return (
    <div>
      <Button onClick={onToggle}>
        edit world
        <Icons.Settings />
      </Button>
      <Modal className={!show ? 'hidden' : 'block'}>
        <Modal.Background onClick={onToggle} />
        <Modal.Container>
          <form className="flex flex-1 flex-col" onSubmit={onSubmit}>
            <h2 className="text-lg font-bold">World Settings</h2>
            <FormField className="my-1 flex flex-col pr-3">
              <FormField.Label
                className="text-sm text-neutral-600"
                htmlFor="name"
              >
                world name
              </FormField.Label>
              <FormField.Input
                id="name"
                {...register('name', { required: "can't be empty" })}
              />
              {errors.name && <FormField.Error message={errors.name.message} />}
            </FormField>

            <div className="mt-auto flex items-center justify-end gap-5">
              <Button type="button" onClick={onDelete}>
                delete
              </Button>
              <Button type="submit">save</Button>
            </div>
          </form>
        </Modal.Container>
      </Modal>
    </div>
  );
};

export default EditWorld;

import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { WorldMeta } from '@/app/world-metas/types';
import { useMetaStore } from '@/app/world-metas';

import Button from '@/components/Button';
import FormField from '@/components/FormField';
import shallow from 'zustand/shallow';
import { deleteWorldDB } from '@/app/db';

export type EditWorldFormVals = {
  name: string;
};

type Props = {
  meta: WorldMeta;
  onToggle: () => void;
};

const EditWorldForm: React.FC<Props> = ({ meta, onToggle }) => {
  const navigate = useNavigate();
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
  } = useForm<EditWorldFormVals>({
    defaultValues: meta,
  });

  const onDelete = async () => {
    const confirmed = confirm(`Are you sure you want to delete ${meta.name}?`);
    if (confirmed) {
      deleteWorldDB(meta.id, () => {
        console.log(
          'please close all other tabs that have this world open first.',
        );
      });
      await deleteMeta(meta);
      navigate('/');
    }
  };

  const onUpdate = handleSubmit(async ({ name }) => {
    await updateMeta({ ...meta, name });
    onToggle();
  });

  return (
    <form className="flex flex-1 flex-col" onSubmit={onUpdate}>
      <h2 className="text-lg font-bold">World Settings</h2>
      <FormField className="my-1 flex flex-col pr-3">
        <FormField.Label className="text-sm text-neutral-600" htmlFor="name">
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
  );
};

export default EditWorldForm;

import { useForm } from 'react-hook-form';
import { dispatch } from '@/app/dispatch';
import { deleteWorld } from '@/app/world';
import { createMeta } from '@/app/metas';
import { WorldMeta } from '@/app/metas/types';

import Button from '@/components/Button';
import FormField from '@/components/FormField';

type FormValues = {
  name: string;
};

type Props = {
  meta: WorldMeta;
  onToggle: () => void;
};

const EditWorldForm: React.FC<Props> = ({ meta, onToggle }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: { name: meta.name },
  });

  const onDelete = () => {
    const confirmation = confirm(
      `Are you sure you want to delete ${meta.name}?`,
    );
    if (confirmation) {
      dispatch(deleteWorld());
      onToggle();
    }
  };

  const onSubmit = handleSubmit(({ name }) => {
    dispatch(createMeta({ ...meta, name }));
    onToggle();
  });

  return (
    <form className="flex flex-1 flex-col" onSubmit={onSubmit}>
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

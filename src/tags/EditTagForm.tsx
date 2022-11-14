import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { dispatch } from '@/app/dispatch';
import { createTag, deleteTag } from '@/app/world';
import { useTags } from '@/app/world/hooks';
import { Tag } from '@/app/world/types';

import Button from '@/components/Button';
import FormField from '@/components/FormField';

type Props = {
  tag: Tag;
  tagValues: Omit<Tag, 'id'>;
  onToggle: () => void;
};

const EditTagForm: React.FC<Props> = ({ tag, tagValues, onToggle }) => {
  const tags = useTags();
  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<Tag>({ defaultValues: tagValues });

  const onDelete = () => {
    dispatch(deleteTag(tag.id));
    navigate('../');
  };

  const onSubmit = handleSubmit((newValues) => {
    dispatch(createTag({ ...newValues, id: tag.id }));
    onToggle();
  });

  return (
    <form onSubmit={onSubmit}>
      <h2 className="text-lg font-bold">Tag Settings</h2>
      <FormField>
        <FormField.Label htmlFor="name">tag name</FormField.Label>
        <FormField.Input
          id="name"
          {...register('name', {
            required: 'cannot be empty',
            validate: (value: string) => {
              if (value === tag.name || !tags.find((tag) => tag.name === value))
                return true;
              return 'name already exists!';
            },
          })}
        />
        {errors.name && <FormField.Error message={errors.name.message} />}
      </FormField>
      <div className="flex items-center gap-3">
        <FormField className="w-full">
          <FormField.Label htmlFor="text-color">text color</FormField.Label>
          <FormField.Input
            id="text-color"
            {...register('color.text', { required: 'cannot be empty' })}
          />
          {errors.color?.text && (
            <FormField.Error message={errors.color.text.message} />
          )}
        </FormField>
        <FormField className="w-full">
          <FormField.Label htmlFor="background-color">
            background color
          </FormField.Label>
          <FormField.Input
            id="background-color"
            {...register('color.background', {
              required: 'cannot be empty',
            })}
          />
          {errors.color?.text && (
            <FormField.Error message={errors.color.text.message} />
          )}
        </FormField>
      </div>
      <div className="mt-auto flex items-center justify-end gap-5 pt-4">
        <Button type="button" onClick={onDelete}>
          delete
        </Button>
        <Button type="submit">save</Button>
      </div>
    </form>
  );
};

export default EditTagForm;

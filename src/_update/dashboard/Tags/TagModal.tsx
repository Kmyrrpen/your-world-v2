import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import shallow from 'zustand/shallow';

import { Tag } from '@/app/world-curr/types';
import { useWorldStore } from '@/app/world-curr';
import { stateObjectToArray } from '@/utils';

import Button from '@/components/Button';
import FormField from '@/components/FormField';
import Modal from '@/components/Modal';
import { useMemo } from 'react';

type EditTagFormVals = Omit<Tag, 'id'>;
type Props = {
  tag: Tag;
  onClose: () => void;
};

const EditTagModal: React.FC<Props> = ({ tag, onClose }) => {
  const navigate = useNavigate();

  const { tags, deleteTag, createTag } = useWorldStore(
    (state) => ({
      tags: stateObjectToArray(state.tags),
      deleteTag: state.deleteTag,
      createTag: state.setTag,
    }),
    shallow,
  );

  const clonedTag = useMemo(() => ({ ...tag, id: undefined }), [tag]);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<EditTagFormVals>({ defaultValues: clonedTag });

  const onDelete = async () => {
    await deleteTag(tag);
    navigate('../');
  };

  const onSubmit = handleSubmit(async (newValues) => {
    await createTag({ ...newValues, id: tag.id });
    onClose();
  });

  return (
    <Modal>
      <Modal.Background onClick={onClose} />
      <Modal.Container>
        <form onSubmit={onSubmit}>
          <h2 className="text-lg font-bold">Tag Settings</h2>
          <FormField>
            <FormField.Label htmlFor="name">tag name</FormField.Label>
            <FormField.Input
              id="name"
              {...register('name', {
                required: 'cannot be empty',
                validate: (value: string) => {
                  if (
                    value === tag.name ||
                    !tags.find((item) => item.name === value)
                  )
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
      </Modal.Container>
    </Modal>
  );
};

export default EditTagModal;

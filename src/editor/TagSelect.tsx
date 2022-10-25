import { nanoid } from 'nanoid';
import { useState } from 'react';
import { ActionMeta, OnChangeValue } from 'react-select';
import CreateableSelect from 'react-select/creatable';

import { dispatch } from '@/app/dispatch';
import { createTag } from '@/app/world';
import { useTagsObj } from '@/app/world/hooks';
import { Note, Tag } from '@/app/world/types';
import { tagsToArray } from '@/utils';

type TagOption = Readonly<{
  value: string;
  label: string;
}>;

type Props = {
  draft: Note;
  setter: React.Dispatch<React.SetStateAction<Note>>;
};

const tagsToOptions = (tags: Tag[]): TagOption[] => {
  return tags.map((tag) => ({ value: tag.id, label: tag.name }));
};
const optionsToTagIds = (options: TagOption[]) => {
  return options.map((option) => option.value);
};

const randomColor = () => '#ade34f';

const TagSelect: React.FC<Props> = ({ draft, setter }) => {
  const [isLoading, setIsLoading] = useState(false);

  const tagsObj = useTagsObj();
  const tagOptions = tagsToOptions(tagsToArray(tagsObj));
  const values: TagOption[] = tagsToOptions(
    draft.tagIds.map((tagId) => tagsObj[tagId]),
  );

  const onChange = async (
    newValue: OnChangeValue<TagOption, true>,
    actionMeta: ActionMeta<TagOption>,
  ) => {
    let newTagOptions = [...newValue];

    // if new option, create the tag on the store
    // then change the default option value on newTagOptions
    if (actionMeta.action === 'create-option') {
      const newTag = {
        name: actionMeta.option.value,
        color: randomColor(),
        description: '',
        id: nanoid(),
      };

      // wait for db to create tag
      setIsLoading(true);
      await dispatch(createTag(newTag));
      setIsLoading(false);

      newTagOptions = newTagOptions.map((option) =>
        option !== actionMeta.option ? option : { ...option, value: newTag.id },
      );
    }

    setter((prev) => ({
      ...prev,
      tagIds: optionsToTagIds([...newTagOptions]),
    }));
  };

  return (
    <CreateableSelect
      isMulti
      isDisabled={isLoading}
      onChange={onChange}
      value={values}
      options={tagOptions}
    />
  );
};

export default TagSelect;

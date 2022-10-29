import { nanoid } from 'nanoid';
import { useState } from 'react';
import { ActionMeta, OnChangeValue } from 'react-select';
import CreateableSelect from 'react-select/creatable';
import { dispatch } from '@/app/dispatch';
import { createTag } from '@/app/world';
import { useTagsObj } from '@/app/world/hooks';
import { Note } from '@/app/world/types';
import { tagsToArray } from '@/utils';

import {
  getRandomColor,
  optionsToTagIds,
  sortValuesByName,
  tagsToOptions,
  useSelectStyles,
} from './utils';

export type TagOption = Readonly<{
  value: string;
  label: string;
  color: string;
}>;

type Props = {
  draft: Note;
  setter: React.Dispatch<React.SetStateAction<Note>>;
};

const TagSelect: React.FC<Props> = ({ draft, setter }) => {
  const [isLoading, setIsLoading] = useState(false);
  const tagsObj = useTagsObj();
  const styles = useSelectStyles();

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
        color: getRandomColor(),
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
    
    newTagOptions.sort((a, b) => a.label.localeCompare(b.label));
    setter((prev) => ({
      ...prev,
      tagIds: optionsToTagIds(sortValuesByName([...newTagOptions])),
    }));
  };

  return (
    <CreateableSelect
      isMulti
      placeholder="Add Tag.."
      styles={styles}
      isClearable={false}
      isDisabled={isLoading}
      onChange={onChange}
      value={values}
      options={tagOptions}
    />
  );
};

export default TagSelect;

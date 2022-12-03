import { nanoid } from 'nanoid';
import { useState } from 'react';
import { ActionMeta, OnChangeValue } from 'react-select';
import CreateableSelect from 'react-select/creatable';
import { isColorDark, stateObjectToArray } from '@/utils';

import { Note, Tag } from '@/app/world-curr/types';
import { useWorldStore } from '@/app/world-curr';

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
  color: Tag['color'];
}>;

type Props = {
  draft: Note;
  setter: React.Dispatch<React.SetStateAction<Note>>;
};

const TagSelect: React.FC<Props> = ({ draft, setter }) => {
  const [isLoading, setIsLoading] = useState(false);
  const tags = useWorldStore((state) => state.tags);
  const createTag = useWorldStore((state) => state.setTag);
  const styles = useSelectStyles();

  const tagOptions = tagsToOptions(stateObjectToArray(tags));
  const values: TagOption[] = tagsToOptions(
    draft.tagIds.map((tagId) => tags[tagId]),
  );

  const onChange = async (
    newValue: OnChangeValue<TagOption, true>,
    actionMeta: ActionMeta<TagOption>,
  ) => {
    let newTagOptions = [...newValue];

    // if new option, create the tag on the store
    // then change the default option value on newTagOptions
    if (actionMeta.action === 'create-option') {
      const newColor = getRandomColor();
      const newTag: Tag = {
        name: actionMeta.option.value,
        color: {
          background: newColor,
          text: isColorDark(newColor) ? '#ffffff' : '#000000',
        },
        description: '',
        id: nanoid(),
      };

      setIsLoading(true);
      await createTag(newTag);

      newTagOptions = newTagOptions.map((option) =>
        option !== actionMeta.option ? option : { ...option, value: newTag.id },
      );
      setIsLoading(false);
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

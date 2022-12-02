import { useUserStore } from '@/app/user-preference';
import { Theme } from '@/app/user-preference/types';
import { Tag } from '@/app/world-curr/types';
import { useMemo } from 'react';
import { StylesConfig } from 'react-select';
import { TagOption } from '.';

export const useSelectStyles = () => {
  const theme = useUserStore(state => state.theme);
  return useMemo(() => getStyles(theme), [theme]);
};

/**
 * react-select unfortunately uses emotion under the hood, it becomes a bit hard to style these
 * with tailwindcss so best just use the reccomended way to set styles which is through this function.
 */
export const getStyles = (theme?: Theme): StylesConfig<TagOption> => ({
  control: (state) => ({
    ...state,
    background: 'none',
    borderWidth: '0',
    boxShadow: 'none',
  }),
  input: (state) => ({
    ...state,
    color: theme === 'dark' ? 'white' : 'black',
  }),
  valueContainer: (state) => ({
    ...state,
    padding: '0px',
  }),
  multiValue: (state, { data }) => ({
    ...state,
    color: 'black',
    backgroundColor: data.color.background,
  }),
  multiValueLabel: (state, { data }) => ({
    ...state,
    color: data.color.text,
  }),
  multiValueRemove: (state, { data }) => ({
    ...state,
    color: data.color.text,
  }),
  option: (state, { isFocused }) => ({
    ...state,
    backgroundColor:
      theme === 'dark' && isFocused ? '#414141' : state.backgroundColor,
    ':active': {
      backgroundColor:
        theme === 'dark' ? '#414141' : state[':active']?.backgroundColor,
    },
  }),
  menu: (state) => ({
    ...state,
    zIndex: 50,
  }),
  menuList: (state) => ({
    ...state,
    padding: 0,
    backgroundColor: theme === 'dark' ? '#232323' : 'white',
  }),
});

export const sortValuesByName = (options: TagOption[]): TagOption[] => {
  return options.sort((a, b) => (a.value < b.value ? 1 : 0));
};

// this was obviously taken from somewhere else.
// https://css-tricks.com/snippets/javascript/random-hex-color/ the comment by Ken
export const getRandomColor = (): string => {
  const x = Math.round(0xffffff * Math.random()).toString(16);
  const y = 6 - x.length;
  const z = '000000';
  const z1 = z.substring(0, y);
  return '#' + z1 + x;
};

export const optionsToTagIds = (options: TagOption[]) => {
  return options.map((option) => option.value);
};
export const tagsToOptions = (tags: Tag[]): TagOption[] => {
  return tags.map((tag) => ({
    value: tag.id,
    label: tag.name,
    color: tag.color,
  }));
};

import { notesToArray, tagsToArray } from '@/utils';
import { useMemo } from 'react';
import { useSnapshot } from 'valtio';
import { worldStore } from '.';
import { Note, NotesObject, Tag, TagsObject, WorldState } from './types';

// TODO: make sort function
const sortNotes = (notes: Note[]): Note[] => notes;
const sortTags = (tags: Tag[]): Tag[] => tags;

export const useNotesObj = (): NotesObject => {
  const { notes } = useSnapshot(worldStore);
  return notes;
};

export const useTagsObj = (): TagsObject => {
  const { tags } = useSnapshot(worldStore);
  return tags;
};

export const useNotes = (): Note[] => {
  const { notes } = useSnapshot(worldStore);
  const sortedNotes = useMemo(() => sortNotes(notesToArray(notes)), [notes]);
  return sortedNotes;
};

export const useTags = (): Tag[] => {
  const { tags } = useSnapshot(worldStore);
  const sortedTags = useMemo(() => sortTags(tagsToArray(tags)), [tags]);
  return sortedTags;
};

export const useWorld = (): Readonly<WorldState> => {
  return useSnapshot(worldStore);
};

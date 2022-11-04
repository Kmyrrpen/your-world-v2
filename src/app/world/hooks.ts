import {stateObjectToArray } from '@/utils';
import { useMemo } from 'react';
import { useSnapshot } from 'valtio';
import { worldStore } from '.';
import { Note, NotesObject, Tag, TagsObject, WorldState } from './types';

// TODO: make sort function
const sortNotes = (notes: Note[]): Note[] => notes;
const sortTags = (tags: Tag[]): Tag[] => tags;

export const useNotesObj = (): NotesObject => {
  return useSnapshot(worldStore)['notes'];
};

export const useTagsObj = (): TagsObject => {
  return useSnapshot(worldStore)['tags'];
};

export const useNotes = (): Note[] => {
  const { notes } = useSnapshot(worldStore);
  // useMemo already runs on render so valtio will still detect
  // eslint-disable-next-line valtio/state-snapshot-rule
  const sortedNotes = useMemo(() => sortNotes(stateObjectToArray(notes)), [notes]);
  return sortedNotes;
};

export const useTags = (): Tag[] => {
  const { tags } = useSnapshot(worldStore);
  // useMemo already runs on render so valtio will still detect
  // eslint-disable-next-line valtio/state-snapshot-rule
  const sortedTags = useMemo(() => sortTags(stateObjectToArray(tags)), [tags]);
  return sortedTags;
};

export const useWorld = (): Readonly<WorldState> => {
  return useSnapshot(worldStore);
};

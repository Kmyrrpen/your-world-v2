import React from 'react';
import { WorldMeta, WorldMetasObject } from './app/metas/types';
import { Note, NotesObject, Tag, TagsObject } from './app/world/types';

// removes readonly modifier from every property of an object
export type Writeable<T> = { -readonly [P in keyof T]: T[P] };

// used to create polymorphic components with the as property.
export type Polymorphic<
  C extends React.ElementType,
  A extends object = Record<string, unknown>,
> = React.PropsWithChildren<{
  as?: C;
  className?: string;
}> &
  React.ComponentPropsWithoutRef<C> &
  A;

export const tagsToArray = (
  tagsObj: TagsObject,
  filterString?: string,
): Tag[] =>
  Object.keys(tagsObj).reduce<Tag[]>((prev, key) => {
    const tag = tagsObj[key];
    if (!filterString) prev.push(tag);
    else if (tag.name.includes(filterString)) prev.push(tag);
    return prev;
  }, []);

export const notesToArray = (notesObj: NotesObject): Note[] =>
  Object.keys(notesObj).map((key) => notesObj[key]);

export const metasToArray = (metasObj: WorldMetasObject): WorldMeta[] =>
  Object.keys(metasObj).map((key) => metasObj[key]);


// https://stackoverflow.com/questions/3942878/how-to-decide-font-color-in-white-or-black-depending-on-background-color
/**
 * given a hex color, returns true if whether or not the color is too dark to have black text placed on top of it.
 * This function was originally from stackoverflow, link in the definition
 */
export const isColorDark = (hexColor: string) => {
  const color =
    hexColor.charAt(0) === '#' ? hexColor.substring(1, 7) : hexColor;
  const r = parseInt(color.substring(0, 2), 16); // hexToR
  const g = parseInt(color.substring(2, 4), 16); // hexToG
  const b = parseInt(color.substring(4, 6), 16); // hexToB
  const uicolors = [r / 255, g / 255, b / 255];
  const c = uicolors.map((col) => {
    if (col <= 0.03928) {
      return col / 12.92;
    }
    return Math.pow((col + 0.055) / 1.055, 2.4);
  });
  const L = 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
  return L < 0.179;
};

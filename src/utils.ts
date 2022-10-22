import { Note, NotesObject, Tag, TagsObject } from './app/world/types';

// removes readonly modifier from every property of an object
export type Writeable<T> = { -readonly [P in keyof T]: T[P] };

// used to create polymorphic components with the as property.
export type Polymorphic<
  C extends React.ElementType,
  A extends Object = {},
> = React.PropsWithChildren<{
  as?: C;
  className?: string;
}> &
  React.ComponentPropsWithoutRef<C> &
  A;

export const tagsToArray = (tagsObj: TagsObject): Tag[] =>
  Object.keys(tagsObj).map((key) => tagsObj[key]);

export const notesToArray = (notesObj: NotesObject): Note[] =>
  Object.keys(notesObj).map((key) => notesObj[key]);

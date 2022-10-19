import { Note, NotesObject, Tag, TagsObject } from "./app/world/types";

// removes readonly modifier from every property of an object
export type Writeable<T> = { -readonly [P in keyof T]: T[P] };

export const tagsToArray = (tagsObj: TagsObject): Tag[] =>
  Object.keys(tagsObj).map((key) => tagsObj[key]);

export const notesToArray = (notesObj: NotesObject): Note[] =>
  Object.keys(notesObj).map((key) => notesObj[key]);

import { Note, NotesObject, Tag, TagsObject } from '@/app/world-curr/types';
import { WorldMeta, WorldMetasObject } from '@/app/world-metas/types';

export type Action<P = never, R = void> = [P] extends [never]
  ? () => R
  : (payload: P) => R;

export type LoadState = 'loading' | 'loaded' | 'error';

/** Removes readonly modifiers from every porperty from type */
export type Writeable<T> = { -readonly [P in keyof T]: T[P] };

/** Intersect A & B but with B overriding A's properties in case of conflict */
export type Overwrite<A, B> = Omit<A, keyof B> & B;

/** Given a state object type (`Notes`, `WorldMeta`, `Tags`), pass it's individual counter-part. */
export type ConvertStateObjToItem<T> = T extends NotesObject
  ? Note
  : T extends TagsObject
  ? Tag
  : T extends WorldMetasObject
  ? WorldMeta
  : never;

export type RenderProp<T extends Record<string, unknown>> = (
  props: T,
) => React.ReactElement | null;

export type PropsWithRender<
  IP extends Record<string, unknown> = {},
  P extends Record<string, unknown> = {},
> = P & {
  /** when provided, render this instead with injected props passed to it. */
  render?: RenderProp<IP>;

  /** classes to override default classes with `tailwind-merge`. */
  className?: string;

  children?: React.ReactNode;
};

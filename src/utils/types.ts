import { Note, NotesObject, Tag, TagsObject } from '@/app/world-curr/types';
import { WorldMeta, WorldMetasObject } from '@/app/world-metas/types';
import { ComponentPropsWithRef } from 'react';

export type Zaction<P, R = void> = (payload: P) => R;
export type LoadState = 'none' | 'loading' | 'loaded' | 'error';

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

/**
 * just like `ComponentPropsWithRef<T>` but with `ref` key changed to `innerRef`. This is used to bypass
 * react stripping ref away from the component.
 */
export type ComponentPropsWithInnerRef<T extends React.ElementType> = {
  [K in keyof ComponentPropsWithRef<T> as K extends 'ref'
    ? 'innerRef'
    : K]: ComponentPropsWithRef<T>[K];
};

export type WithComponentProps<
  T extends React.ElementType,
  P extends Record<string, unknown> = {},
> = Overwrite<ComponentPropsWithInnerRef<T>, P>;

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

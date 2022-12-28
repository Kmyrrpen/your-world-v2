export type PolyProps<P = {}> = Overwrite<{ className?: string }, P>;
export type Action<P = never, R = void> = [P] extends [never]
  ? () => R
  : (payload: P) => R;

/** Removes readonly modifiers from every porperty from type */
export type Writeable<T> = { -readonly [P in keyof T]: T[P] };

/** Intersect A & B but with B overriding A's properties in case of conflict */
export type Overwrite<A, B> = Omit<A, keyof B> & B;

export type ContextHook<S extends object> = <T>(
  selector: (state: S) => T,
  equalityFn?: (left: T, right: T) => boolean,
) => T;

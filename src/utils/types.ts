export type PolyProps<P = {}> = Overwrite<{ className?: string }, P>;
export type Action<P = never, R = void> = [P] extends [never]
  ? () => R
  : (payload: P, fromChannel?: true) => R;

/** Removes readonly modifiers from every porperty from type */
export type Writeable<T> = { -readonly [P in keyof T]: T[P] };

/** Intersect A & B but with B overriding A's properties in case of conflict */
export type Overwrite<A, B> = Omit<A, keyof B> & B;

export type StoreHook<S extends object> = <T>(
  selector: (state: S) => T,
  equalityFn?: (left: T, right: T) => boolean,
) => T;

export type Loading = "idle" | "loading" | "loaded" | "error";

export type PostMessage<Actions extends Record<string, Action<any, any>>> = <
  T extends keyof Actions,
>(
  message: Actions[T] extends Action<infer P, unknown>
    ? [P] extends [never]
      ? { type: T }
      : {
          type: T;
          payload: P;
        }
    : never,
) => void;
